module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "mocha": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "rules": {
        "indent": [
            "error",
            "tab",
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-warning-comments": [1, {"terms": ["todo"], "location": "anywhere"}],
        "no-console": 0,
        "no-unused-vars": 0,
        "no-extra-parens": 1,
        //"keyword-spacing": [1, "always"],
        "space-before-blocks": [1, "always"]
    }
};