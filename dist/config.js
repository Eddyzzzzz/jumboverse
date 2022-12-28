//BEHAVIOR: FOLLOW, TAKE, DROP, PUSH
//LOGIC: ID of objects it will interact with e.g TAKE object with DROP
//DOORS: ID of door objects (only works with drop for now) and limited to 1x3 doors
module.exports = {
    API_KEY: "1srYM822j0rwhqJj",
    url: "4e31x6F6onnGNChp\\Eddy_test",
    SPACE_ID: "4e31x6F6onnGNChp\\Eddy_test",
    // url: "oimL5gsmKZJcFExW\\mastermind-demo",
    // SPACE_ID: "oimL5gsmKZJcFExW\\mastermind-demo",
    // url: "Ho6abUIslqoWcDQ7\\gamifygather-scavaganza",
    // SPACE_ID: "Ho6abUIslqoWcDQ7\\gamifygather-scavaganza",
    // BetaDwarf Office
    // url: "m5UqybVLl1KttCij\\office",
    // SPACE_ID: "m5UqybVLl1KttCij\\office",
    MAP_ID: [
        "empty-room-medium-brick"
        // "betadwarf-mastermind"  
        // "test-room"
        // "custom-entrance"
        // "knights-room-puzzle-run"
        // "storefront", // This map references all of the code in KEVINWEBSOCKETS_TEST, so if I add another map, then I need antoher All_OBJECTS room/list of objects
        // 
    ],
    STATUE: {
        "off": "https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/internal-dashboard/images/twIKv7bnw-CLPwyfYsO-E",
        "on": "https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/internal-dashboard/images/A_4_wAmZIAazGZoGYrCgW"
    },
    DOORS: {
        "open": "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/internal-dashboard-upload%2FOAS5P91MeHHJ9X3x?alt=media&token=5cbaf712-c15f-47ca-9a35-160831d22ffd",
        "close": "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/internal-dashboard-upload%2F2NUrsU3ek8g60Yez?alt=media&token=7ee54bfe-0594-42e0-95e8-0befc2064521"
    },
    ARROW_DIR: {
        "down": "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/internal-dashboard-upload%2F6BgVETZfCGaKPA2T?alt=media&token=cc32fda4-d498-4593-8547-7675f1e561cb",
        "left": "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/internal-dashboard-upload%2FvxC2LnC8H1ltvP1S?alt=media&token=409d5b82-8b11-47ed-b145-c4b55b65da8d",
        "up": "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/internal-dashboard-upload%2FnQIEQCMu2OBHi20G?alt=media&token=d6462a6e-df94-416e-afdc-d54d6a1e3c7e",
        "right": "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/internal-dashboard-upload%2F2lmHBWwOnr066bTe?alt=media&token=3aa45e8f-795d-4e34-9829-a23c5dc3c66d"
    },
    BLANK: "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/internal-dashboard-upload%2FPGcG9m2GSI8BCixU?alt=media&token=1890032a-0726-40db-a8bb-9426871e7db8",
    PLATE: {
        "glass": "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/internal-dashboard-upload%2FYEeExcvH2DBnZsrI?alt=media&token=1b8fcb20-960f-40ec-b8b8-2a8496123e59"
    },
    BRAIN: "https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/internal-dashboard/images/8WKeYhaQDxaW7P7IBFSqv",
    ALL_OBJECTS: {
        KEVIN_WEBSOCKETS: {
            "ICtruck": {
                "id": "ICtruck",
                "type": 7,
                "x": 13,
                "y": 7,
                "width": 4,
                "height": 3,
                "distThreshold": 2,
                "previewMessage": "Press X to get a speed-up ice-cream! :)",
                "normal": "https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/internal-dashboard/images/zDMMm2MaFU0f1YmCoRSQt",
                "highlighted": "https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/internal-dashboard/images/zDMMm2MaFU0f1YmCoRSQt",
                "customState": "none",
                'COOLDOWN': 0,
                "properties": { extensionData: {
                        entries: [
                            {
                                type: "header",
                                value: "Welcome! Which ice-cream would you like?",
                                key: "start_header"
                            },
                            {
                                type: "radio",
                                key: "radio_input",
                                options: [
                                    {
                                        label: "Lightning ice-cream 🍦",
                                        key: "Lightning ice-cream 🍦"
                                    },
                                    {
                                        label: "TP sundae 🍨",
                                        key: "TP sundae 🍨"
                                    },
                                    {
                                        label: "Ghost shaved ice 🍧",
                                        key: "Ghost shaved ice 🍧"
                                    },
                                ]
                            },
                        ]
                    } },
                'BEHAVIOR': 'none',
                'FIXED': true,
                'LOGIC': 'none',
                'DOORS': 'none',
                'SWAPPABLE': false,
                'STACKABLE': false,
                'TRADEABLE': false,
                'LOOTABLE': false
            },
            "Do": {
                "id": "Do",
                "type": 5,
                "x": 12,
                "y": 10,
                "width": 1,
                "height": 1,
                "distThreshold": 2,
                "previewMessage": "Do",
                "normal": "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/internal-dashboard-upload%2F2KVqQxQF002AADwy?alt=media&token=075b0493-10e8-43b1-94e5-cbe14d662cca",
                "highlighted": "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/internal-dashboard-upload%2F2KVqQxQF002AADwy?alt=media&token=075b0493-10e8-43b1-94e5-cbe14d662cca",
                "customState": "none",
                'COOLDOWN': 0,
                "properties": 'none',
                'BEHAVIOR': 'none',
                'FIXED': true,
                'LOGIC': 'none',
                'DOORS': 'none',
                'SWAPPABLE': false,
                'STACKABLE': false,
                'TRADEABLE': false,
                'LOOTABLE': false
            },
            "Re": {
                "id": "Re",
                "type": 5,
                "x": 13,
                "y": 10,
                "width": 1,
                "height": 1,
                "distThreshold": 2,
                "previewMessage": "Re",
                "normal": "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/internal-dashboard-upload%2F2KVqQxQF002AADwy?alt=media&token=075b0493-10e8-43b1-94e5-cbe14d662cca",
                "highlighted": "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/internal-dashboard-upload%2F2KVqQxQF002AADwy?alt=media&token=075b0493-10e8-43b1-94e5-cbe14d662cca",
                "customState": "none",
                'COOLDOWN': 0,
                "properties": 'none',
                'BEHAVIOR': 'none',
                'FIXED': true,
                'LOGIC': 'none',
                'DOORS': 'none',
                'SWAPPABLE': false,
                'STACKABLE': false,
                'TRADEABLE': false,
                'LOOTABLE': false
            },
            "Mi": {
                "id": "Mi",
                "type": 5,
                "x": 14,
                "y": 10,
                "width": 1,
                "height": 1,
                "distThreshold": 2,
                "previewMessage": "Mi",
                "normal": "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/internal-dashboard-upload%2F2KVqQxQF002AADwy?alt=media&token=075b0493-10e8-43b1-94e5-cbe14d662cca",
                "highlighted": "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/internal-dashboard-upload%2F2KVqQxQF002AADwy?alt=media&token=075b0493-10e8-43b1-94e5-cbe14d662cca",
                "customState": "none",
                'COOLDOWN': 0,
                "properties": 'none',
                'BEHAVIOR': 'none',
                'FIXED': true,
                'LOGIC': 'none',
                'DOORS': 'none',
                'SWAPPABLE': false,
                'STACKABLE': false,
                'TRADEABLE': false,
                'LOOTABLE': false
            },
            "Fa": {
                "id": "Fa",
                "type": 5,
                "x": 15,
                "y": 10,
                "width": 1,
                "height": 1,
                "distThreshold": 2,
                "previewMessage": "Fa",
                "normal": "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/internal-dashboard-upload%2F2KVqQxQF002AADwy?alt=media&token=075b0493-10e8-43b1-94e5-cbe14d662cca",
                "highlighted": "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/internal-dashboard-upload%2F2KVqQxQF002AADwy?alt=media&token=075b0493-10e8-43b1-94e5-cbe14d662cca",
                "customState": "none",
                'COOLDOWN': 0,
                "properties": 'none',
                'BEHAVIOR': 'none',
                'FIXED': true,
                'LOGIC': 'none',
                'DOORS': 'none',
                'SWAPPABLE': false,
                'STACKABLE': false,
                'TRADEABLE': false,
                'LOOTABLE': false
            },
            "Sol": {
                "id": "So",
                "type": 5,
                "x": 16,
                "y": 10,
                "width": 1,
                "height": 1,
                "distThreshold": 2,
                "previewMessage": "Sol",
                "normal": "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/internal-dashboard-upload%2F2KVqQxQF002AADwy?alt=media&token=075b0493-10e8-43b1-94e5-cbe14d662cca",
                "highlighted": "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/internal-dashboard-upload%2F2KVqQxQF002AADwy?alt=media&token=075b0493-10e8-43b1-94e5-cbe14d662cca",
                "customState": "none",
                'COOLDOWN': 0,
                "properties": 'none',
                'BEHAVIOR': 'none',
                'FIXED': true,
                'LOGIC': 'none',
                'DOORS': 'none',
                'SWAPPABLE': false,
                'STACKABLE': false,
                'TRADEABLE': false,
                'LOOTABLE': false
            },
            "La": {
                "id": "La",
                "type": 5,
                "x": 17,
                "y": 10,
                "width": 1,
                "height": 1,
                "distThreshold": 2,
                "previewMessage": "La",
                "normal": "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/internal-dashboard-upload%2F2KVqQxQF002AADwy?alt=media&token=075b0493-10e8-43b1-94e5-cbe14d662cca",
                "highlighted": "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/internal-dashboard-upload%2F2KVqQxQF002AADwy?alt=media&token=075b0493-10e8-43b1-94e5-cbe14d662cca",
                "customState": "none",
                'COOLDOWN': 0,
                "properties": 'none',
                'BEHAVIOR': 'none',
                'FIXED': true,
                'LOGIC': 'none',
                'DOORS': 'none',
                'SWAPPABLE': false,
                'STACKABLE': false,
                'TRADEABLE': false,
                'LOOTABLE': false
            },
            "Si": {
                "id": "Si",
                "type": 5,
                "x": 18,
                "y": 10,
                "width": 1,
                "height": 1,
                "distThreshold": 2,
                "previewMessage": "Si",
                "normal": "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/internal-dashboard-upload%2F2KVqQxQF002AADwy?alt=media&token=075b0493-10e8-43b1-94e5-cbe14d662cca",
                "highlighted": "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/internal-dashboard-upload%2F2KVqQxQF002AADwy?alt=media&token=075b0493-10e8-43b1-94e5-cbe14d662cca",
                "customState": "none",
                'COOLDOWN': 0,
                "properties": 'none',
                'BEHAVIOR': 'none',
                'FIXED': true,
                'LOGIC': 'none',
                'DOORS': 'none',
                'SWAPPABLE': false,
                'STACKABLE': false,
                'TRADEABLE': false,
                'LOOTABLE': false
            }
        }
    }
};
//# sourceMappingURL=config.js.map