"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
class BaseMapper {
    constructor() {
        this.databaseURL = config_1.config.web.database;
    }
    extractLogo(issuer) {
        const provider = issuer.toLowerCase();
        const icons = { name: provider };
        switch (provider) {
            case 'heroku':
                Object.assign(icons, { name: 'hero', group: 'transport-logos' });
                break;
            case 'reddit':
                Object.assign(icons, { group: 'social-media' });
                break;
            case 'dropbox':
                Object.assign(icons, { group: 'social-media' });
                break;
            case 'amazon':
                Object.assign(icons, { group: 'social-media' });
                break;
            case 'google':
                Object.assign(icons, { name: 'google-plus', group: 'social-media' });
                break;
            case 'github':
                Object.assign(icons, { group: 'software-development' });
                break;
            case 'figma':
                Object.assign(icons, { name: 'sketch', group: 'logo' });
                break;
            case 'microsoft':
                Object.assign(icons, { group: 'logo' });
                break;
            case 'netflix':
                Object.assign(icons, { group: 'logo' });
                break;
            case 'slack':
                Object.assign(icons, { group: 'logo' });
                break;
            case 'spotify':
                Object.assign(icons, { group: 'social-media' });
                break;
        }
        return icons;
    }
}
exports.default = BaseMapper;
