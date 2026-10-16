
fn connect_bose() -> Result<bmap::BmapConnection<bmap::transport::windows::WinRfcommTransport>, String> {
    let mac = std::env::var("BMAP_MAC").ok();
    let device_type = std::env::var("BMAP_DEVICE").ok();

    bmap::connect(mac.as_deref(), device_type.as_deref())
        .map_err(|e| format!("Connexion au casque Bose impossible : {}", e))
}

#[tauri::command]
fn set_anc_mode(mode: String) -> Result<String, String> {
    let dev = connect_bose()?;

    dev.set_mode(&mode, false)
        .map_err(|e| format!("Erreur de changement de mode : {}", e))?;

    Ok(format!("Commande envoyée pour le mode {}", mode))
}

#[tauri::command]
fn get_battery_level() -> Result<u8, String> {
    let dev = connect_bose()?;

    dev.battery()
        .map_err(|e| format!("Erreur de lecture de la batterie : {}", e))
}

#[tauri::command]
fn get_current_mode() -> Result<String, String> {
    let dev = connect_bose()?;

    dev.mode()
        .map_err(|e| format!("Erreur de lecture du mode : {}", e))
}
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            
            set_anc_mode,
            get_battery_level,
            get_current_mode
        ])
        .run(tauri::generate_context!())
        .expect("Erreur lors du lancement de BoseWindowsApp");
}