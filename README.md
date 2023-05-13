## Chuyển Google sheet sang định dạng JSON hỗ trợ translator i18next sử dụng Nodejs

### Giới thiệu
- Script cho phép chuyển đổi file sheet sang tương ứng các ngôn ngữ định dạng json. 
- Cập nhật file json ngôn ngữ hỗ trợ dịch các thư viện như react-i18next, next-i18next,...
- Sử dụng file google sheet dễ dàng sửa, thêm ngôn ngữ mới

### Chuẩn bị
- Clone dự án
``` 
git clone https://github.com/danhnotes/update-localize
```
- Chạy lệnh

```
 cd update-localize
 yarn install (or npm install)
```
- Tạo file ```google-generated-creds.json``` từ google cloud, copy vào thư mục "update-localize"
https://console.cloud.google.com/ => Google Sheets API => Credentials => Create Credentials => Service Account {sau đó sang bên google sheet, share cho email ở đây example: demo-111@demoproject-386502.iam.gserviceaccount.com} =>  tab Keys => Create new key => download file JSON => copy vào ```google-generated-creds.json```
- tạo file ".env",  tạo thông tin gồm 
```
sheet={name_sheet}
spreadsheetKey={url_google_sheet example: 1ZrCrid-a6_6zE7Za_1eKNfNa65dikzxha9saECozBB4}
path={path_translator example: ./src/translations/}
```
### Thực hiện
- Chạy lệnh ```yarn start```, sau đó sẽ có thư mục được tạo ra.
- Nếu muốn tạo file {window, macos, linux} để translator thì dùng pkg
```
yarn add pkg global
cd update-localize
pkg index.js
```
sau đó tạo ra 3 file {index-macos, index-linux, index-window.exe}, với linux, mac chạy ```./index-macos```, với window chạy file index-window.exe
