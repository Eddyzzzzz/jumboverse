"use strict";
exports.__esModule = true;
var _a = require("./config"), url = _a.url, API_KEY = _a.API_KEY, SPACE_ID = _a.SPACE_ID, MAP_ID = _a.MAP_ID, BLANK = _a.BLANK, ALL_OBJECTS = _a.ALL_OBJECTS, ALL_ROOMS = _a.ALL_ROOMS;
var gather_game_client_1 = require("@gathertown/gather-game-client");
global.WebSocket = require("isomorphic-ws");
// *** Heroku Online Code (Start) ***
//Initial setup for POSTing
var express = require("express");
//const axios = require("axios");
var app = express();
// use alternate localhost and the port Heroku assigns to $PORT
var host = '0.0.0.0';
var port = process.env.PORT || 8000;
// *** Heroku Online Code (End) ***
var game = new gather_game_client_1.Game(url, function () { return Promise.resolve({ apiKey: API_KEY }); });
game.connect();
game.subscribeToConnection(function (connected) { return console.log("connected?", connected); });
var throttledQueue = require('throttled-queue');
var throttle = throttledQueue(2, 200, true);
// const throttleRtR = throttledQueue(1, 1000, true);
var initSocks = function () {
    var temp = false;
    game.subscribeToEvent("playerMoves", function (data, context) {
        if (temp == false) {
            temp = true;
            console.log('Building hall...');
            buildMainHall();
        }
    });
    game.subscribeToEvent("playerJoins", function (data, context) {
        // console.log(context.playerId + "Display Name: " + context.player.name + data.playerJoins.encId);
        // game.registerCommand("teleport"); // Register Command for /teleport
        // game.registerCommand("count"); // Register Command for /count players in each map
        // game.registerCommand("mute"); // Register Command for /mute for players
        // throttle(() => { 
        //   game.registerCommand("teleport"); // Register Command for /teleport
        //   game.registerCommand("count"); // Register Command for /count players in each map
        //   game.registerCommand("mute"); // Register Command for /mute for players
    });
};
initSocks();
//Builds map with objects listed in config.ts under MAIN_HALL_OBJ
var raidObjects = {};
var raidPlayers = {};
var raidPlayersXY = {};
// const raidRooms: { [id: string]: RaidRoom } = {};
var raidTeams = {};
var raidPlayerOufit = {};
var raidPlayerStats = {};
var setRaidObject = function (x, map, someObject) {
    throttle(function () {
        game.setObject(map, someObject.id.toString(), {
            id: someObject.id.toString(),
            type: someObject.type,
            x: someObject.x,
            y: someObject.y,
            width: someObject.width,
            height: someObject.height,
            distThreshold: someObject.distThreshold,
            previewMessage: someObject.previewMessage,
            normal: someObject.normal,
            highlighted: someObject.highlighted,
            spritesheet: someObject.spritesheet,
            customState: someObject.customState,
            properties: someObject.properties
        });
        console.log("".concat(someObject.id.toString(), " has been set successfully"));
    });
};
var generate_objects = function () {
    var map_index = 0;
    var index_tracker = 0;
    // First loop cycles through maps
    // Second loop is the group of objects
    // [error from gs] 500: error processing action mapSetObjects: Error: Object index out of bounds, try game.addObject
    // happens in an empty room. mapsetobjects does not seem to work unless there are already existing objects placed via mapmaker
    Object.keys(ALL_OBJECTS).forEach(function (key, index) {
        var map = MAP_ID[index];
        map_index = index_tracker;
        var objects = {};
        Object.keys(ALL_OBJECTS[key]).forEach(function (key2, index2) {
            objects[index2] = {
                id: ALL_OBJECTS[key][key2].id.toString(),
                height: ALL_OBJECTS[key][key2].height,
                width: ALL_OBJECTS[key][key2].width,
                distThreshold: ALL_OBJECTS[key][key2].distThreshold,
                x: ALL_OBJECTS[key][key2].x,
                y: ALL_OBJECTS[key][key2].y,
                type: ALL_OBJECTS[key][key2].type,
                previewMessage: ALL_OBJECTS[key][key2].previewMessage,
                normal: ALL_OBJECTS[key][key2].normal,
                highlighted: ALL_OBJECTS[key][key2].highlighted,
                spritesheet: ALL_OBJECTS[key][key2].spritesheet,
                customState: "",
                _tags: []
            };
            raidObjects[ALL_OBJECTS[key][key2].id.toString()] = new RaidObject(Object.keys(ALL_OBJECTS[key])[index], ALL_OBJECTS[key][key2].id.toString(), ALL_OBJECTS[key][key2].type, ALL_OBJECTS[key][key2].x, ALL_OBJECTS[key][key2].y, ALL_OBJECTS[key][key2].width, ALL_OBJECTS[key][key2].height, ALL_OBJECTS[key][key2].distThreshold, ALL_OBJECTS[key][key2].previewMessage, ALL_OBJECTS[key][key2].normal, ALL_OBJECTS[key][key2].highlighted, ALL_OBJECTS[key][key2].customState, map, ALL_OBJECTS[key][key2].COOLDOWN, ALL_OBJECTS[key][key2].properties, ALL_OBJECTS[key][key2].BEHAVIOR, ALL_OBJECTS[key][key2].FIXED, ALL_OBJECTS[key][key2].TRADEABLE, ALL_OBJECTS[key][key2].LOOTABLE, ALL_OBJECTS[key][key2].SWAPPABLE, ALL_OBJECTS[key][key2].STACKABLE, ALL_OBJECTS[key][key2].LOGIC, ALL_OBJECTS[key][key2].DOORS);
            index_tracker++;
        });
        // console.log(objects[0]);
        throttle(function () {
            game.setMapObjects(map, objects);
            console.log("Objects set for ".concat(MAP_ID[index]));
        });
    });
};
var buildMainHall = function () {
    var map_index = 0;
    var index_tracker = 0;
    //Classes stuff
    Object.keys(ALL_OBJECTS).forEach(function (key, index) {
        var map = MAP_ID[index];
        map_index = index_tracker;
        Object.keys(ALL_OBJECTS[key]).forEach(function (key2, index2) {
            setRaidObject(index2 + map_index, map, ALL_OBJECTS[key][key2]);
            switch (ALL_OBJECTS[key][key2].BEHAVIOR) {
                default:
                    console.log("No behavior found for ".concat(ALL_OBJECTS[key][key2].id.toString(), ", setting default Object"));
                    raidObjects[ALL_OBJECTS[key][key2].id.toString()] = new RaidObject(Object.keys(ALL_OBJECTS[key])[index], ALL_OBJECTS[key][key2].id.toString(), ALL_OBJECTS[key][key2].type, ALL_OBJECTS[key][key2].x, ALL_OBJECTS[key][key2].y, ALL_OBJECTS[key][key2].width, ALL_OBJECTS[key][key2].height, ALL_OBJECTS[key][key2].distThreshold, ALL_OBJECTS[key][key2].previewMessage, ALL_OBJECTS[key][key2].normal, ALL_OBJECTS[key][key2].highlighted, ALL_OBJECTS[key][key2].customState, map, ALL_OBJECTS[key][key2].COOLDOWN, ALL_OBJECTS[key][key2].properties, ALL_OBJECTS[key][key2].BEHAVIOR, ALL_OBJECTS[key][key2].FIXED, ALL_OBJECTS[key][key2].TRADEABLE, ALL_OBJECTS[key][key2].LOOTABLE, ALL_OBJECTS[key][key2].SWAPPABLE, ALL_OBJECTS[key][key2].STACKABLE, ALL_OBJECTS[key][key2].LOGIC, ALL_OBJECTS[key][key2].DOORS);
                    break;
            }
            index_tracker++;
        });
    });
};
//Delete object
var deleteRaidObject = function (id, player) {
    game.deleteObject(raidObjects[id].map_id, raidObjects[id].id);
    delete raidPlayers[player];
    delete raidObjects[id];
};
//soundUrl: string, x: number, y: number, width: number, height: number
var playSoundinArea = function (objectID, width, height, soundURL, volume) {
    var halfwidth = width / 2 | 0;
    var halfheight = height / 2 | 0;
    var x = raidObjects[objectID].x - halfwidth;
    var y = raidObjects[objectID].y - halfheight;
    //plays sound to players in 5x5
    // "https://s3.amazonaws.com/raidtheroom.online/gather/kevinwebsockets/teleport-quick.wav"
    Object.keys(raidPlayersXY).forEach(function (key, index) {
        if (raidPlayersXY[key].x >= x && raidPlayersXY[key].x <= x + (width - 1) && raidPlayersXY[key].y >= y && raidPlayersXY[key].y <= y + (height - 1)) {
            game.playSound(soundURL, volume, key);
        }
    });
};
var checkPlayersinArea = function (x, y, width, height) {
    var playerCount = 0;
    Object.keys(raidPlayersXY).forEach(function (key, index) {
        if (raidPlayersXY[key].x >= x && raidPlayersXY[key].x <= x + (width - 1) && raidPlayersXY[key].y >= y && raidPlayersXY[key].y <= y + (height - 1)) {
            playerCount++;
        }
    });
};
//Deletes all non-Raid Objects in map_id
var deleteNonRaidObjects = function (map_id) {
    var map_objects = Object.values(game.partialMaps[map_id].objects);
    var key_array = [];
    Object.keys(map_objects).forEach(function (key, index) {
        var obj_id = map_objects[key].id;
        var obj_key = map_objects[key].key;
        if (obj_id.length > 6) {
            key_array.push(obj_key);
            console.log("Non-RaidObject found. ".concat(obj_key, " marked for deletion"));
        }
    });
    var x = 0;
    var _loop_1 = function (i) {
        setTimeout(function () {
            game.deleteObjectByKey(map_id, key_array[i]);
            console.log("Object ".concat(key_array[i], " has been deleted."));
        }, 100 * x);
        x++;
    };
    for (var i = key_array.length - 1; i >= 0; i--) {
        _loop_1(i);
    }
    console.log("deleteNonRaidObject has finished.");
};
var runSocks = function () {
    game.subscribeToEvent('playerInteracts', function (data, context) {
        var objectID = data.playerInteracts.objId;
        //When interacting with reset
        //Change this part later 
        // if (objectID == '1000') {
        //   buildMainHall();
        //   game.setTextStatus('this guy hit the reset button', context.playerId);
        // }
        // Throttle and setTextStatus test
        // if (objectID == ALL_OBJECTS.KEVIN_WEBSOCKETS.Icecream.id){
        // game.setMapObjects(MAP_ID[0], {
        //   // https://forum.gather.town/t/employee-only-areas-using-doors/384/3
        // }
        // );
        // game.enterPortal("https://app.gather.town/app/Ho6abUIslqoWcDQ7/gamifygather-scavaganza?skipSetup=true", context.playerId, true);
        // if (raidPlayerOufit[context.playerId] == undefined) {
        //   console.log("sheep case");
        //   raidPlayerOufit[context.playerId] = context.player.outfitString;
        //   let outfit = JSON.parse(game.players[context.playerId].outfitString);
        //   let spriteSheetId = "XSATKnUokhgNuZV71QeZ";
        //   console.log(outfit + " " + spriteSheetId);
        //   outfit.costume = {"id":"ro7qFRHBfXhwZZ2LpeLR","color":"black","type":"costume","parts":[{"spritesheetId":spriteSheetId,"layerId":"costume front"}],"previewUrl":"https://cdn.gather.town/storage.googleapis.com/gather-town.appspot.com/wearables/HHjh8IShCs1sAXRpLU-Nd","name":"bride_of_frankenstein","isDefault":true,"startDate":{"_seconds":1633046400,"_nanoseconds":0}};
        //   game.setOutfitString(JSON.stringify(outfit), context.playerId);
        // } else {
        //   console.log("else case");
        //   game.setOutfitString(raidPlayerOufit[context.playerId], context.playerId);
        //   delete raidPlayerOufit[context.playerId];
        // }    
        // console.log(game.filterObjectsInMap(MAP_ID[0], (obj) => obj.id.startsWith("Blue"))[0].x);
        // game.shootConfetti();
        // }
        if (objectID == ALL_OBJECTS.KEVIN_WEBSOCKETS.ICtruck.id) {
            var json_data = data.playerInteracts.dataJson;
            console.log(json_data);
            var parsed_JSON = JSON.parse(json_data);
            console.log(parsed_JSON);
            var ICtype = parsed_JSON.radio_input;
            console.log(parsed_JSON.radio_input);
            if (parsed_JSON = !undefined) {
                if (ICtype === "Lightning ice-cream 🍦") {
                    game.setEmote("⚡️");
                    game.setEmojiStatus("🍦");
                    game.notify("You just consumed a lightning ice-cream. You'll move two times faster for 10 seconds!");
                    game.chat("GLOBAL_CHAT", [], MAP_ID[0], { contents: context.player.name + " just consumed a lightning ice-cream." + context.player.name + " will move two times faster for 10 seconds!" });
                    game.setSpeedModifier(2, context.playerId);
                    setTimeout(function () { game.setEmote(""); }, 10000);
                    setTimeout(function () { game.setEmojiStatus(""); }, 10000);
                    setTimeout(function () { game.setSpeedModifier(1, context.playerId); }, 10000);
                }
                if (ICtype === "TP sundae 🍨") {
                    game.setEmojiStatus("🍨");
                    game.notify("You just consumed a TP sundae. You'll teleport to a random location!");
                    game.chat("GLOBAL_CHAT", [], MAP_ID[0], { contents: context.player.name + " just consumed a TP sundae." + context.player.name + " will teleport to a random location!" });
                    game.teleport(MAP_ID[0], Math.random() * 26, Math.random() * 15, context.playerId);
                    setTimeout(function () { game.setEmojiStatus(""); }, 3000);
                }
                if (ICtype === "Ghost shaved ice 🍧") {
                    game.setEmote("👻");
                    game.setEmojiStatus("🍧");
                    game.notify("You just consumed a Ghost shaved ice. You'll be able to walk through everything for 10 seconds!");
                    game.chat("GLOBAL_CHAT", [], MAP_ID[0], { contents: context.player.name + " just consumed a Ghost shaved ice." + context.player.name + " will be able to walk through everything for 10 seconds!" });
                    game.ghost(1, context.playerId);
                    setTimeout(function () { game.setEmote(""); }, 10000);
                    setTimeout(function () { game.setEmojiStatus(""); }, 10000);
                    setTimeout(function () { game.ghost(0, context.playerId); }, 10000);
                }
            }
        }
        if (objectID == ALL_OBJECTS.KEVIN_WEBSOCKETS.Do.id) {
            console.log('success');
            game.playSound('', 1.0, context.playerId);
        }
        if (objectID == ALL_OBJECTS.KEVIN_WEBSOCKETS.Re.id) {
            console.log('success');
            game.playSound('', 1.0);
        }
        if (objectID == ALL_OBJECTS.KEVIN_WEBSOCKETS.Mi.id) {
            console.log('success');
            game.playSound('', 1.0);
        }
        if (objectID == ALL_OBJECTS.KEVIN_WEBSOCKETS.Fa.id) {
            console.log('success');
            game.playSound('', 1.0);
        }
        if (objectID == ALL_OBJECTS.KEVIN_WEBSOCKETS.So.id) {
            console.log('success');
            game.playSound('', 1.0);
        }
        if (objectID == ALL_OBJECTS.KEVIN_WEBSOCKETS.La.id) {
            console.log('success');
            game.playSound('', 1.0);
        }
        if (objectID == ALL_OBJECTS.KEVIN_WEBSOCKETS.Si.id) {
            console.log('success');
            game.playSound('', 1.0);
        }
        //Classes experimentation
        if (raidObjects[objectID].id != 'undefined') {
            console.log(objectID + " has been interacted with");
            // playSoundinArea(objectID, 9, 9, "https://s3.amazonaws.com/raidtheroom.online/gather/kevinwebsockets/teleport-quick.wav", .25);
            raidObjects[objectID].interaction(context.playerId);
        }
    });
    game.subscribeToEvent("playerTriggersItem", function (_a, _b) {
        var playerTriggersItem = _a.playerTriggersItem;
        var player = _b.player, playerId = _b.playerId;
        if (!playerId || !player) {
            return;
        }
        //Finds the closest object within a range of 1 and assigns it to the closestObject variable
        var closestObjectTemplate = playerTriggersItem.closestObjectTemplate, closestObject = playerTriggersItem.closestObject;
        //Get X/Y in front of player
        //Assigns them to front_x and front_y
        var front_x = game.getPlayer(playerId).x, front_y = game.getPlayer(playerId).y;
        switch (game.getPlayer(playerId).direction) {
            case 3:
            case 4:
                front_y--;
                break;
            case 7:
            case 8:
                front_x++;
                break;
            case 1:
            case 2:
                front_y++;
                break;
            case 5:
            case 6:
                front_x--;
                break;
            default:
                console.log('invalid direction??');
        }
        //Check for any players in front
        //Assigns player id to front_player
        var front_player = 'none';
        Object.keys(raidPlayersXY).every(function (key, index) {
            if (raidPlayersXY[key].x == front_x && raidPlayersXY[key].y == front_y && key != playerId) {
                front_player = key;
                return false;
            }
            return true;
        });
        //Check if player has any items currently;
        var player_object = 'none';
        if (raidPlayers[playerId] != undefined)
            player_object = raidPlayers[playerId];
        //Determine what action to take based on the properties of FIXED, TRADEABLE, LOOTABLE, SWAPPABLE, and STACKABLE
        //Priotizes interacting with objects
        if (closestObject != undefined) {
            var close_object = raidObjects[closestObject];
            //Checks if the object is in front of the player or under the player as well as the FIXED property of the object
            if (((player.x == close_object.x && player.y == close_object.y) || (close_object.x == front_x && close_object.y == front_y)) && !close_object.FIXED) {
                //If the player has no items, pick up the close object
                if (player_object == 'none') {
                    raidPlayers[playerId] = closestObject;
                    game.deleteObject(raidObjects[closestObject].map_id, raidObjects[closestObject].id);
                    game.setItem("closestObjectTemplate", raidObjects[closestObject].normal, playerId);
                    console.log("".concat(game.getPlayer(playerId).name, " picked up ").concat(closestObject, "!"));
                }
                else {
                    // If player has an item, check the SWAPPABLE property and swap items if true
                    if (raidObjects[player_object].SWAPPABLE && close_object.SWAPPABLE == true) {
                        raidPlayers[playerId] = closestObject;
                        game.setObject(raidObjects[player_object].map_id, raidObjects[player_object].id.toString(), {
                            id: raidObjects[player_object].id.toString(),
                            type: raidObjects[player_object].type,
                            x: close_object.x,
                            y: close_object.y,
                            width: raidObjects[player_object].width,
                            height: raidObjects[player_object].height,
                            distThreshold: raidObjects[player_object].distThreshold,
                            previewMessage: raidObjects[player_object].previewMessage,
                            normal: raidObjects[player_object].normal,
                            highlighted: raidObjects[player_object].highlighted,
                            customState: raidObjects[player_object].customState,
                            properties: raidObjects[player_object].properties
                        });
                        raidObjects[player_object].x = close_object.x;
                        raidObjects[player_object].y = close_object.y;
                        game.deleteObject(raidObjects[closestObject].map_id, raidObjects[closestObject].id);
                        game.setItem("closestObjectTemplate", raidObjects[closestObject].normal, playerId);
                        console.log("".concat(game.getPlayer(playerId).name, " swapped ").concat(player_object, " with ").concat(closestObject, "!"));
                    }
                    else if (raidObjects[player_object].STACKABLE && close_object.STACKABLE) {
                        //Stack currently held object on to another object if both STACKLABLE properties are true
                        game.setObject(raidObjects[player_object].map_id, raidObjects[player_object].id.toString(), {
                            id: raidObjects[player_object].id.toString(),
                            type: raidObjects[player_object].type,
                            x: close_object.x,
                            y: close_object.y,
                            width: raidObjects[player_object].width,
                            height: raidObjects[player_object].height,
                            distThreshold: raidObjects[player_object].distThreshold,
                            previewMessage: raidObjects[player_object].previewMessage,
                            normal: raidObjects[player_object].normal,
                            highlighted: raidObjects[player_object].highlighted,
                            customState: raidObjects[player_object].customState,
                            properties: raidObjects[player_object].properties
                        });
                        raidObjects[player_object].x = close_object.x;
                        raidObjects[player_object].y = close_object.y;
                        delete raidPlayers[playerId];
                        game.clearItem(playerId);
                        console.log("".concat(game.getPlayer(playerId).name, " stacked ").concat(player_object, " with ").concat(closestObject, "!"));
                    }
                }
            }
            else if (raidPlayers[playerId] != undefined) {
                //If the space infront is empty and the player is carrying something, drop the currently held items in front of the player
                game.setObject(raidObjects[player_object].map_id, raidObjects[player_object].id.toString(), {
                    id: raidObjects[player_object].id.toString(),
                    type: raidObjects[player_object].type,
                    x: front_x,
                    y: front_y,
                    width: raidObjects[player_object].width,
                    height: raidObjects[player_object].height,
                    distThreshold: raidObjects[player_object].distThreshold,
                    previewMessage: raidObjects[player_object].previewMessage,
                    normal: raidObjects[player_object].normal,
                    highlighted: raidObjects[player_object].highlighted,
                    customState: raidObjects[player_object].customState,
                    properties: raidObjects[player_object].properties
                });
                raidObjects[player_object].x = front_x;
                raidObjects[player_object].y = front_y;
                delete raidPlayers[playerId];
                game.clearItem(playerId);
                console.log("".concat(game.getPlayer(playerId).name, " has dropped ").concat(player_object, "!"));
            }
        }
        else if (front_player != 'none') {
            //Check if the other player is carrying anything
            var other_player_object = 'none';
            if (raidPlayers[front_player] != undefined)
                other_player_object = raidPlayers[front_player];
            //If both players have items and both items' TRADEABLE property is true, then trade items
            if (player_object != 'none' && other_player_object != 'none') {
                if (raidObjects[player_object].TRADEABLE && raidObjects[other_player_object].TRADEABLE) {
                    raidPlayers[playerId] = other_player_object;
                    raidPlayers[front_player] = player_object;
                    game.setItem("closestObjectTemplate", raidObjects[other_player_object].normal, playerId);
                    game.setItem("closestObjectTemplate", raidObjects[player_object].normal, front_player);
                    console.log("".concat(game.getPlayer(playerId).name, " has traded ").concat(player_object, " for ").concat(other_player_object, " from ").concat(game.getPlayer(front_player).name, "!"));
                }
            }
            else if (player_object == 'none' && other_player_object != 'none') {
                //If the player doesn't have items but the other player does, steal his item if its LOOTABLE property is true
                if (raidObjects[other_player_object].LOOTABLE) {
                    raidPlayers[playerId] = other_player_object;
                    delete raidPlayers[front_player];
                    game.setItem("closestObjectTemplate", raidObjects[other_player_object].normal, playerId);
                    game.clearItem(front_player);
                    console.log("".concat(game.getPlayer(playerId).name, " has stolen ").concat(other_player_object, " from ").concat(game.getPlayer(front_player).name, "!"));
                } //Add gifting here
            }
            else if (player_object != 'none' && other_player_object == 'none') {
                if (raidObjects[player_object].TRADEABLE) {
                    raidPlayers[front_player] = player_object;
                    console.log(front_player);
                    delete raidPlayers[playerId];
                    game.setItem("closestObjectTemplate", raidObjects[player_object].normal, front_player);
                    game.clearItem(playerId);
                    console.log("".concat(game.getPlayer(playerId).name, " has given ").concat(other_player_object, " to ").concat(game.getPlayer(front_player).name, "!"));
                }
            }
        }
        else if (raidPlayers[playerId] != undefined) {
            //If the space infront is empty and the player is carrying something, drop the currently held items in front of the player
            game.setObject(raidObjects[player_object].map_id, raidObjects[player_object].id.toString(), {
                id: raidObjects[player_object].id.toString(),
                type: raidObjects[player_object].type,
                x: front_x,
                y: front_y,
                width: raidObjects[player_object].width,
                height: raidObjects[player_object].height,
                distThreshold: raidObjects[player_object].distThreshold,
                previewMessage: raidObjects[player_object].previewMessage,
                normal: raidObjects[player_object].normal,
                highlighted: raidObjects[player_object].highlighted,
                customState: raidObjects[player_object].customState,
                properties: raidObjects[player_object].properties
            });
            raidObjects[player_object].x = front_x;
            raidObjects[player_object].y = front_y;
            delete raidPlayers[playerId];
            game.clearItem(playerId);
            console.log("".concat(game.getPlayer(playerId).name, " has dropped ").concat(player_object, "!"));
        }
        else {
            console.log("".concat(game.getPlayer(playerId).name, " has found nothing of importance"));
        }
    });
    game.subscribeToEvent("playerMoves", function (data, context) {
        //Experimental class follow code
        if (context.player.map == MAP_ID[0] || context.player.map == MAP_ID[1] || context.player.map == MAP_ID[2]) {
            Object.keys(raidObjects).forEach(function (key, index) {
                if (raidObjects[key].BEHAVIOR == 'FOLLOW' || raidObjects[key].BEHAVIOR == 'SWAP') {
                    var newX = context.player.x;
                    var newY = context.player.y;
                    if (raidObjects[key].customState != 'none') {
                        switch (data.playerMoves.direction) {
                            case 1:
                            case 2:
                                newY -= 1;
                                break;
                            case 3:
                            case 4:
                                newY += 1;
                                break;
                            case 5:
                            case 6:
                                newX += 1;
                                break;
                            case 7:
                            case 8:
                                newX -= 1;
                                break;
                            default:
                                console.log('Invalid direction??');
                                break;
                        }
                        raidObjects[key].follow(newX, newY, context.player.name);
                    }
                }
                // if (raidObjects[key].BEHAVIOR == 'PUSH') {
                //   let newX = context.player.x;
                //   let newY = context.player.y;
                //   if(newX == raidObjects[key].x && newY == raidObjects[key].y) {
                //     switch (data.playerMoves.direction) {
                //       case 1:
                //       case 2:
                //           newY += 1;
                //           break;
                //       case 3:
                //       case 4:
                //           newY -= 1;
                //           break;
                //       case 5:
                //       case 6:
                //           newX -= 1;
                //           break;
                //       case 7:
                //       case 8:
                //           newX += 1;
                //           break;
                //       default:
                //           console.log('Invalid direction??');
                //           break;
                //     }
                //     raidObjects[key].setMove(newX, newY);
                //     raidObjects[key].move(newX, newY);
                //   }
                // }
            });
        }
        //Store player location data locally for play sound area
        if (context.player.map == MAP_ID[0]) {
            if (raidPlayersXY[context.playerId] == undefined) {
                raidPlayersXY[context.playerId] = {
                    x: 0,
                    y: 0,
                    map_id: context.player.map
                };
            }
            raidPlayersXY[context.playerId].x = context.player.x;
            raidPlayersXY[context.playerId].y = context.player.y;
        }
        //Pressure Plates
        if (context.player.map == MAP_ID[4]) {
            var roomPlayers = game.getPlayersInMap(MAP_ID[4]);
            var plates = [{ 'x': 5, 'y': 2 }, { 'x': 7, 'y': 2 }, { 'x': 5, 'y': 4 }, { 'x': 7, 'y': 4 }];
            var x = 0;
            for (var i = 0; i < roomPlayers.length; i++) {
                for (var j = 0; j < plates.length; j++) {
                    if (roomPlayers[i].x == plates[j].x && roomPlayers[i].y == plates[j].y) {
                        console.log(context.player.name + " is stepping on " + "".concat(plates[j].x, ", ").concat(plates[j].y));
                        x++;
                    }
                }
            }
            //Set x == plates.length for number of plates to be stepped on
            // if (x == raidRooms['first-puzzle-room'].capacity) {
            //   raidObjects['5000'].setTypeToFive();
            // } else {
            //   raidObjects['5000'].setTypeToZero();
            // }
        }
        // if (context.player.isAlone == true){
        //   console.log(context.player.name + " is alone");
        // }
        // else if (context.player.isAlone == false || context.player.inConversation == true || context.player.activelySpeaking == 1){
        //   console.log(context.player.name + " isAlone: " + context.player.isAlone + " is inConversation: " + context.player.inConversation + " is activelySpeaking: " + context.player.activelySpeaking);
        // }
        // console.log(context.player.name + " isAlone: " + context.player.isAlone + " is inConversation: " + context.player.inConversation + " is activelySpeaking: " + context.player.activelySpeaking);
        // console.log(context.player.name + " - " + game.filterUidsInSpace((player) => player.isAlone == false));
        if (context.player.x == 12 && context.player.y == 11) {
            console.log('success');
            game.playSound('https://musicnote.s3.amazonaws.com/Do.wav', 1);
        }
        if (context.player.x == 13 && context.player.y == 11) {
            console.log('success');
            game.playSound('https://musicnote.s3.amazonaws.com/Re.wav', 1);
        }
        if (context.player.x == 14 && context.player.y == 11) {
            console.log('success');
            game.playSound('https://musicnote.s3.amazonaws.com/Mi.wav', 1);
        }
        if (context.player.x == 15 && context.player.y == 11) {
            console.log('success');
            game.playSound('https://musicnote.s3.amazonaws.com/Fa.wav', 1);
        }
        if (context.player.x == 16 && context.player.y == 11) {
            console.log('success');
            game.playSound('https://musicnote.s3.amazonaws.com/Sol.wav', 1);
        }
        if (context.player.x == 17 && context.player.y == 11) {
            console.log('success');
            game.playSound('https://musicnote.s3.amazonaws.com/La.wav', 1);
        }
        if (context.player.x == 18 && context.player.y == 11) {
            console.log('success');
            game.playSound('https://musicnote.s3.amazonaws.com/Si.wav', 1);
        }
    });
    game.subscribeToEvent("playerChats", function (data, context) {
        var message = data.playerChats;
        console.log(message);
    });
    // game.subscribeToEvent("playerSetsIsAlone", (data, context) => {
    //   console.log(context.player.name + " sets is alone");
    // });
    // game.subscribeToEvent("playerActivelySpeaks", (data, context) => {
    // const message = data.playerActivelySpeaks;
    // console.log(message);
    // if (data.playerActivelySpeaks && context.player.isAlone == false){
    // console.log(context.player.name + "Speaking together");
    // console.log(Object.keys(game.filterPlayersInSpace((player) => player.isAlone == false)));
    // console.log(context.player.name + " - " + game.filterUidsInSpace((player) => player.isAlone == false));
    // console.log(Object.keys(game.players));
    // }
    // const payload = {
    //   "space_id": SPACE_ID,
    //   "map_id": MAP_ID[0],
    //   "player_id": context.playerId,
    //   "increment": "1",
    // }
    // axios.post("https://rtr-web.herokuapp.com/api/gather-counter/kevinwebsockets", payload).then ((res)=>{
    //       console.log(res.data);
    // })
    // });
};
runSocks();
// *** Heroku Online Code (Start) ***
app.listen(port, host, function () {
    console.log("Server started.......");
});
// *** Heroku Online Code (End) **
//Experimenting with classes
var RaidObject = /** @class */ (function () {
    function RaidObject(name, id, type, x, y, width, height, distThreshold, previewMessage, normal, highlighted, customState, map_id, COOLDOWN, properties, BEHAVIOR, FIXED, TRADEABLE, LOOTABLE, SWAPPABLE, STACKABLE, LOGIC, DOORS) {
        this.name = name;
        this.id = id;
        this.type = type;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.distThreshold = distThreshold;
        this.previewMessage = previewMessage;
        this.normal = normal;
        this.highlighted = highlighted;
        this.customState = customState;
        this.COOLDOWN = COOLDOWN;
        this.properties = properties;
        this.map_id = map_id;
        this.BEHAVIOR = BEHAVIOR;
        this.FIXED = FIXED;
        this.TRADEABLE = TRADEABLE;
        this.LOOTABLE = LOOTABLE;
        this.SWAPPABLE = SWAPPABLE;
        this.STACKABLE = STACKABLE;
        this.LOGIC = LOGIC;
        this.DOORS = DOORS;
    }
    RaidObject.prototype.setRaidObjectCustomState = function (customState) {
        this.customState = customState;
    };
    RaidObject.prototype.interaction = function (player) {
        console.log(this.id + ' base class interaction method called');
    };
    RaidObject.prototype["return"] = function () {
        game.setObject(this.map_id, this.id, {
            type: this.type,
            normal: this.normal,
            highlighted: this.highlighted,
            x: this.x,
            y: this.y
        });
    };
    RaidObject.prototype.move = function (x, y) {
        game.setObject(this.map_id, this.id, {
            type: this.type,
            normal: this.normal,
            highlighted: this.highlighted,
            x: x,
            y: y
        });
    };
    RaidObject.prototype.setMove = function (x, y) {
        this.x = x;
        this.y = y;
        game.setObject(this.map_id, this.id, {
            type: this.type,
            normal: this.normal,
            highlighted: this.highlighted,
            x: x,
            y: y
        });
    };
    RaidObject.prototype.setSprite = function (normal) {
        game.setObject(this.map_id, this.id, {
            normal: normal,
            highlighted: normal
        });
    };
    RaidObject.prototype.setTypeToZero = function () {
        if (this.type != 0) {
            this.type = 0;
            game.setObject(this.map_id, this.id, {
                type: 0
            });
        }
    };
    RaidObject.prototype.setTypeToFive = function () {
        if (this.type != 5) {
            this.type = 5;
            game.setObject(this.map_id, this.id, {
                type: 5
            });
        }
    };
    RaidObject.prototype.flipType = function () {
        this.type == 5 ? this.type = 0 : this.type = 5;
        game.setObject(this.map_id, this.id, {
            type: this.type
        });
    };
    RaidObject.prototype.flip = function () {
        console.log('Base flip triggered');
    };
    RaidObject.prototype.checkAllMatch = function () {
        return false;
    };
    RaidObject.prototype.resetAll = function () {
        console.log('base called');
    };
    RaidObject.prototype.shuffleAll = function () {
        console.log('base called');
    };
    RaidObject.prototype.follow = function (x, y, name) {
        this.x = x;
        this.y = y;
        //game.moveMapObject(this.map_id, this.id, {x, y}, 180, "Linear");
    };
    return RaidObject;
}());
//# sourceMappingURL=index.js.map