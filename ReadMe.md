
# Password Helper
A simple browser-based app for checking the strength of a password, and generating random passwords. 
To try it out, click https://qvotrup.github.io/password-helper/

## Technologies
* Vanilla HTML, JavaScript, CSS
* zxcvbn library
* Web Crypto API

## Security & limitations
* Everything is handled locally and in-browser - your password never leaves your device
* Password generation by using Crypto.getRandomValues() from Web Crypto API ensures a pseudo-random generation that cannot be predicted based on previous outputs.
* zxcvbn is an older library - the latest release (ver. 4.4.2) was from feb 2017.
* Keep in mind, that the secure generation does not protect against malicious browser extensions, malware, or people looking over your shoulder.

## Credits
The password strength estimation is powered by zxcvbn, a library developed by Dropbox and available under the MIT License.


