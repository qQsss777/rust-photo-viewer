/**
 * Convert degrees minutes seconds to degrees decimals
 */
pub fn convert_dms(data: &str, direction: &str) -> Result<String, String> {
    let data_parts: Vec<&str> = data.split_whitespace().collect();
    if data_parts.len() < 5 {
        return Err("Coordinates incompleted".to_string());
    }
    let degrees: f64 = data_parts[0]
        .parse()
        .map_err(|_| "Invalid degrees".to_string())?;
    let minutes: f64 = data_parts[2]
        .parse()
        .map_err(|_| "Invalid minutes".to_string())?;
    let seconds: f64 = data_parts[4]
        .parse()
        .map_err(|_| "Invalid seconds".to_string())?;
    let mut dd: f64 = degrees + (minutes / 60.0) + (seconds / 3600.0);

    // Appliquer le signe en fonction de la direction
    if ["S", "W"].contains(&direction.to_uppercase().as_str()) {
        dd *= -1.0;
    }
    Ok(dd.to_string())
}

#[test]
fn test_convert_dms_north() {
    let result = convert_dms("45 deg 30 min 10 sec", "N").unwrap();
    assert_eq!(result, "45.50277777777778");
}

#[test]
fn test_convert_dms_south() {
    let result = convert_dms("45 deg 30 min 10 sec", "S").unwrap();
    assert_eq!(result, "-45.50277777777778");
}

#[test]
fn test_convert_dms_east() {
    let result = convert_dms("45 deg 30 min 10 sec", "E").unwrap();
    assert_eq!(result, "45.50277777777778");
}

#[test]
fn test_convert_dms_west() {
    let result = convert_dms("45 deg 30 min 10 sec", "W").unwrap();
    assert_eq!(result, "-45.50277777777778");
}
