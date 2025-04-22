use crate::utils::converter;
use base64::{
    alphabet,
    engine::{self, general_purpose},
    Engine as _,
};
use image::ImageReader;
use log::warn;
use serde_json;
use std::collections::HashMap;
use std::fmt;
use std::io::{Cursor, Write};
use tauri::command;

struct PhotoData {
    metadata: String,
    image: String,
    coordinates: String,
}
impl fmt::Display for PhotoData {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(
            f,
            "{{\"image\":\"{}\", \"metadata\":{}, \"coordinates\":{}}}",
            self.image, self.metadata, self.coordinates
        )
    }
}

#[command]
pub fn open_photo(path: &str) -> Result<String, String> {
    let initial_metadata = String::from("null");
    let initial_image = String::from("");
    let initial_coordinates = String::from("null");

    let mut result = PhotoData {
        metadata: initial_metadata,
        image: initial_image,
        coordinates: initial_coordinates,
    };
    match get_exif(path) {
        Ok(data) => result.metadata = data,
        Err(e) => warn!("{}", e),
    }
    match get_image(path) {
        Ok(data) => result.image = format!("data:image/jpeg;base64,{}", data),
        Err(e) => warn!("{}", e),
    }
    if result.metadata != "null" {
        match get_coordinates(&result.metadata) {
            Ok(data) => result.coordinates = format!("{}", data),
            Err(e) => warn!("{}", e),
        }
    }
    if result.image.is_empty() {
        Err(String::from("Erreur de la récupération de l'image"))
    } else {
        Ok(result.to_string())
    }
}

/**
 * Get exif metadata
 */
fn get_exif(path: &str) -> Result<String, String> {
    // Lire les métadonnées EXIF
    let file = std::fs::File::open(path).map_err(|e| format!("Failed to open image: {}", e))?;
    let mut bufreader = std::io::BufReader::new(&file);
    let exifreader = exif::Reader::new();
    let exif = exifreader
        .read_from_container(&mut bufreader)
        .map_err(|e| format!("Failed to read EXIF data: {}", e))?;
    let mut exif_data = HashMap::new();
    for f in exif.fields() {
        exif_data.insert(f.tag.to_string(), f.display_value().to_string());
    }
    let result = serde_json::to_string(&exif_data)
        .map_err(|e| format!("Error during the conversion {}", e))?;
    Ok(result)
}

/**
 * Get image data
 */
fn get_image(path: &str) -> Result<String, String> {
    // use unwrap because sur that photo exist
    let img_reader = ImageReader::open(path).map_err(|e| format!("Failed to open image: {}", e))?;
    let img = img_reader
        .decode()
        .map_err(|e| format!("Failed to decode image: {}", e))?;
    let buffer: Vec<u8> = Vec::new();
    let mut cursor: Cursor<Vec<u8>> = Cursor::new(buffer);
    img.write_to(&mut cursor, image::ImageFormat::Jpeg);
    let encoded = general_purpose::STANDARD.encode(&cursor.into_inner());
    Ok(encoded)
}

/**
 * Get coordinates
 */
fn get_coordinates(metatada: &str) -> Result<String, String> {
    let result = String::from("null");
    let data: serde_json::Value =
        serde_json::from_str(metatada).map_err(|e| format!("Failed to convert metadata: {}", e))?;
    if let Some(_has_latitude) = data.get("GPSLatitudeRef") {
        let mut lon = String::from("");
        let mut lat = String::from("");
        let latitude_ref = data.get("GPSLongitudeRef").unwrap().as_str().unwrap();
        let latitude_value = data.get("GPSLatitude").unwrap().as_str().unwrap();
        let longitude_ref = data.get("GPSLatitudeRef").unwrap().as_str().unwrap();
        let longitude_value = data.get("GPSLongitude").unwrap().as_str().unwrap();
        match converter::convert_dms(longitude_value, longitude_ref) {
            Ok(data) => lon = data,
            Err(e) => return Ok(result),
        }
        match converter::convert_dms(latitude_value, latitude_ref) {
            Ok(data) => lat = data,
            Err(e) => return Ok(result),
        }
        Ok(format!("[{}, {}, 4326]", lon, lat))
    } else {
        Ok(result)
    }
}
