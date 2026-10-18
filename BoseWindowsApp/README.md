# 🎧 Bose QuietComfort Windows Utility (Rust)

A high-performance, lightweight native Windows CLI and library engineered in **Rust** to control Bose QuietComfort devices over Bluetooth SPP / RFCOMM protocols.

[![Language](https://img.shields.io/badge/Language-Rust-orange.svg)](https://www.rust-lang.org/)
[![Platform](https://img.shields.io/badge/Platform-Windows%2010%2F11-blue.svg)]()
[![License](https://img.shields.io/badge/License-MIT-green.svg)]()

---

## ⚡ Overview

Windows lacks native, granular system control for proprietary Bose Bluetooth features (ANC toggle, battery level checks, sound modes). This project directly interfaces with the lower-level **Bluetooth RFCOMM / SPP serial streams** via native Win32 sockets to execute raw protocol commands without bloated GUI runtimes or vendor lock-in.

## 🔑 Key Features

* **Direct RFCOMM/SPP Protocol Handling:** Low-level socket communication directly over Bluetooth COM/RFCOMM ports.
* **Active Noise Cancellation (ANC) Toggle:** Programmatically switch between Quiet, Aware, and custom modes.
* **Device Telemetry:** Real-time extraction of battery status and device metadata.
* **Zero Overhead:** Built with `Rust` for zero-cost abstractions, minimal RAM usage, and instant startup time.

## 🛠️ Tech Stack & Architecture

* **Language:** Rust (Edition 2021)
* **API / OS:** Windows Win32 API / Bluetooth Serial Port Profile (SPP)
* **Architecture:** Asynchronous command packet builder & byte-level response parser

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/GruandAndCo/BoseWindowsApplication.git

# Launch app
pnpm tauri dev

# Run CLI
./target/release/bosectl.exe --mode quiet
