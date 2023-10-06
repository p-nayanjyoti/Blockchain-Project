// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

contract Evehicle {
    uint256 count;
    struct ChargingStation {
        uint256 distance;
        uint256 x_coordinate;
        uint256 y_coordinate;
        uint256 station_ID;
        uint256 PerUnitprice;
        uint256 waitTime_min;
        bool fastCharging;
        bool reachable;
        uint256 score;
        uint256 rating;
    }
    ChargingStation[] public chargingStationList;

    constructor()  {
        count = 10;
        ChargingStation memory cs1 = ChargingStation({
            distance: 0,
            x_coordinate: 15,
            y_coordinate: 24,
            station_ID: count++,
            PerUnitprice: 100,
            waitTime_min: 12,
            fastCharging: true,
            reachable: false,
            score: 0,
            rating: 4
        });
        ChargingStation memory cs2 = ChargingStation({
            distance: 0,
            x_coordinate: 20,
            y_coordinate: 15,
            station_ID: count++,
            PerUnitprice: 102,
            waitTime_min: 14,
            fastCharging: true,
            reachable: false,
            score: 0,
            rating: 5
        });
        ChargingStation memory cs3 = ChargingStation({
            distance: 0,
            x_coordinate: 30,
            y_coordinate: 22,
            station_ID: count++,
            PerUnitprice: 104,
            waitTime_min: 20,
            fastCharging: true,
            reachable: false,
            score: 0,
            rating: 3
        });
        ChargingStation memory cs4 = ChargingStation({
            distance: 0,
            x_coordinate: 14,
            y_coordinate: 23,
            station_ID: count++,
            PerUnitprice: 100,
            waitTime_min: 17,
            fastCharging: true,
            reachable: false,
            score: 0,
            rating: 5
        });
        ChargingStation memory cs5 = ChargingStation({
            distance: 0,
            x_coordinate: 25,
            y_coordinate: 28,
            station_ID: count++,
            PerUnitprice: 102,
            waitTime_min: 24,
            fastCharging: true,
            reachable: false,
            score: 0,
            rating: 5
        });
        chargingStationList.push(cs1);
        chargingStationList.push(cs2);
        chargingStationList.push(cs3);
        chargingStationList.push(cs4);
        chargingStationList.push(cs5);
    }

    function addChargingstation(
        uint256 _x_coordinate,
        uint256 _y_coordinate,
        uint256 _perUnitprice,
        uint256 _waitTime,
        bool _fastCharging
    ) public {
        //store dynamic cs
        chargingStationList.push(
            ChargingStation(
                0,
                _x_coordinate,
                _y_coordinate,
                count++,
                _perUnitprice,
                _waitTime,
                _fastCharging,
                false,
                0,
                4
            )
        );
    }

    function sqrt(uint256 y) internal pure returns (uint256 z) {
        if (y > 3) {
            z = y;
            uint256 x = y / 2 + 1;
            while (x < z) {
                z = x;
                x = (y / x + x) / 2;
            }
        } else if (y != 0) {
            z = 1;
        }
    }

    function sqr(uint256 y) internal pure returns (uint256 z) {
        z = y * y;
    }

    function computedistance(uint256 _x, uint256 _y) public {
        uint256 arrayLength = chargingStationList.length;
        // totalValue auto init to 0
        uint256 distance = 0;
        for (uint256 i = 0; i < arrayLength; i++) {
            uint256 x = chargingStationList[i].x_coordinate;
            uint256 y = chargingStationList[i].y_coordinate;
            if (x > _x) {
                if (y > _y) {
                    distance = sqrt(sqr(x - _x) + sqr(y - _y));
                } else {
                    distance = sqrt(sqr(x - _x) + sqr(_y - y));
                }
            } else {
                if (y > _y) {
                    distance = sqrt(sqr(_x - x) + sqr(y - _y));
                } else {
                    distance = sqrt(sqr(_x - x) + sqr(_y - y));
                }
            }
            chargingStationList[i].distance = distance;
        }
    }

    function isreachable(uint256 charge) public {
        uint256 arrayLength = chargingStationList.length;
        //considering ev covers 1 km in 1%
        // uint distance =0;
        uint256 distance_can_be_coveredcharge;
        distance_can_be_coveredcharge = charge * 1;
        for (uint256 i = 0; i < arrayLength; i++) {
            uint256 distance = chargingStationList[i].distance;
            if (distance > distance_can_be_coveredcharge) {
                chargingStationList[i].reachable = false;
            } else {
                chargingStationList[i].reachable = true;
            }
        }
    }

    function arraylength() public view returns (uint256) {
        uint256 arrayLength = chargingStationList.length;
        return arrayLength;
    }

    function compute_score() public {
        uint256 arrayLength = chargingStationList.length;
        // totalValue auto init to 0
        uint256 _score = 0;
        for (uint256 i = 0; i < arrayLength; i++) {
            // totalValue += mappedUsers[addressIndices[i]];
            if (
                chargingStationList[i].reachable &&
                chargingStationList[i].fastCharging &&
                chargingStationList[i].waitTime_min < 16
            ) {
                _score = 1;
            } else if (
                chargingStationList[i].reachable &&
                chargingStationList[i].waitTime_min < 16
            ) {
                _score = 2;
            } else if (
                chargingStationList[i].reachable &&
                chargingStationList[i].waitTime_min > 15
            ) {
                _score = 3;
            } else {
                _score = 0;
            }
            chargingStationList[i].score = _score;
        }
    }

    function display(uint256 i)
        public
        view
        returns (
            uint256 _x_coordinate,
            uint256 _y_coordinate,
            uint256 _station_ID,
            uint256 _perUnitprice,
            uint256 _waitTime,
            bool _fastCharging,
            uint256 _rating
        )
    {
        // uint arrayLength = chargingStationList.length;
        return (
            chargingStationList[i].x_coordinate,
            chargingStationList[i].y_coordinate,
            chargingStationList[i].station_ID,
            chargingStationList[i].PerUnitprice,
            chargingStationList[i].waitTime_min,
            chargingStationList[i].fastCharging,
            chargingStationList[i].rating
        );
    }

    function getCS() public view returns (ChargingStation[] memory) {
        return chargingStationList;
    }
}
