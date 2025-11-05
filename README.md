# 🚀 SocialApp

React Native (Expo), Firebase ve Redux Toolkit kullanılarak geliştirilmiş modern bir sosyal medya uygulama prototipi.

Bu proje, Firebase Authentication ile tam kullanıcı yönetimi, Firestore üzerinde gerçek zamanlı veri depolama (CRUD işlemleri) ve React Native Reanimated ile akıcı arayüz animasyonlarını birleştiren tam özellikli bir mobil uygulamadır.

## ✨ Temel Özellikler

* **🔒 Firebase Authentication:** E-posta/Şifre ile güvenli kullanıcı girişi, kayıt ve çıkış işlemleri.
* **🔄 Redux Toolkit:** `userSlice` kullanarak global oturum (auth) state yönetimi.
* **🔥 Firebase Firestore:** Gerçek zamanlı NoSQL veritabanı üzerinde tam CRUD (Create, Read, Update, Delete) işlemleri (Örn: Gönderiler, Yorumlar).
* **🎞️ Reanimated v3:** `BounceIn` (giriş) ve `BounceOut` (çıkış) gibi akıcı `LayoutAnimation` (Düzen Animasyonları).
* **🧭 React Navigation:** Özelleştirilmiş Header (Mor Bar) ve Stack/Tab navigasyonu ile sayfalar arası geçiş.
* **🎨 Modern Arayüz:** `FAB` (Floating Action Button), `Modal` ve `Vector Icons` ile şık ve işlevsel tasarım.

## 📱 Ekran Görüntüleri

| 1. Giriş Ekranı | 2. Kayıt Ekranı | 3. Ana Akış (Home) |
| :---: | :---: | :---: |
| ![Giriş Ekranı](https://github.com/user-attachments/assets/0b3df554-2db9-40bc-a41a-5f83cb94880d) | ![Kayıt Ekranı](https://github.com/user-attachments/assets/fd1e596d-409c-4858-83d0-8204fbf54e47) | ![Ana Akış](https://github.com/user-attachments/assets/ba612570-6af7-4341-9ff4-df1f14e04fc9) |

| 4. Güncelleme Modalı | 5. Yeni Gönderi (Modal) |
| :---: | :---: |
| ![Güncelleme Modalı](https://github.com/user-attachments/assets/2b0d4cae-90a2-4957-b289-1ebe8503970f) | ![Yeni Gönderi Modalı](https://github.com/user-attachments/assets/32588bc4-c18e-4e6d-b463-24950013efff) |


## 🛠️ Kullanılan Teknolojiler

* **React Native (Expo)**
* **Firebase** (Authentication & Firestore)
* **React Navigation** (Native Stack)
* **Redux Toolkit** (Global State Yönetimi)
* **React Native Reanimated** (v3)
* **React Native Vector Icons** (FontAwesome5)

## 🚀 Başlarken

Projeyi yerel makinenizde çalıştırmak için:

### Kurulum

```bash
# Projeyi klonlayın (veya indirin)
cd SocialApp

# Paketleri yükleyin
npm install
```
Babel Yapılandırması (Reanimated için)
Projenin ana dizininde babel.config.js dosyasının bulunduğundan ve plugins dizisinin react-native-reanimated/plugin içerdiğinden emin olun:

```JavaScript

// babel.config.js
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin', // Bu satır zorunludur
    ],
  };
};
```
Başlatma
Önbelleği temizleyerek projeyi başlatın:

```Bash

npx expo start -c
```
