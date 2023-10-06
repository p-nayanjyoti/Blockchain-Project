window.ethereum.enable()
var provider = new ethers.providers.Web3Provider(web3.currentProvider, 'ropsten');

  
var EVContractAddress = "0xDe529D0cD701b7AdbAF33475F7AA68e568081deE";
let EVContractABI = [
	{
		"inputs": [
			{
				"internalType": "int64",
				"name": "_x_coordinate",
				"type": "int64"
			},
			{
				"internalType": "int64",
				"name": "_y_coordinate",
				"type": "int64"
			},
			{
				"internalType": "int64",
				"name": "_perUnitprice",
				"type": "int64"
			},
			{
				"internalType": "int64",
				"name": "_waitTime",
				"type": "int64"
			},
			{
				"internalType": "bool",
				"name": "_fastCharging",
				"type": "bool"
			}
		],
		"name": "addChargingstation",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "compute_score",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "int64",
				"name": "_x",
				"type": "int64"
			},
			{
				"internalType": "int64",
				"name": "_y",
				"type": "int64"
			},
			{
				"internalType": "int64",
				"name": "charge",
				"type": "int64"
			}
		],
		"name": "computedistance",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "int64",
				"name": "charge",
				"type": "int64"
			}
		],
		"name": "isreachable",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "arraylength",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "chargingStationList",
		"outputs": [
			{
				"internalType": "int64",
				"name": "distance",
				"type": "int64"
			},
			{
				"internalType": "int64",
				"name": "x_coordinate",
				"type": "int64"
			},
			{
				"internalType": "int64",
				"name": "y_coordinate",
				"type": "int64"
			},
			{
				"internalType": "int64",
				"name": "station_ID",
				"type": "int64"
			},
			{
				"internalType": "int64",
				"name": "PerUnitprice",
				"type": "int64"
			},
			{
				"internalType": "int64",
				"name": "waitTime_min",
				"type": "int64"
			},
			{
				"internalType": "bool",
				"name": "fastCharging",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "reachable",
				"type": "bool"
			},
			{
				"internalType": "int64",
				"name": "score",
				"type": "int64"
			},
			{
				"internalType": "int64",
				"name": "rating",
				"type": "int64"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint64",
				"name": "i",
				"type": "uint64"
			}
		],
		"name": "display",
		"outputs": [
			{
				"internalType": "int64",
				"name": "_x_coordinate",
				"type": "int64"
			},
			{
				"internalType": "int64",
				"name": "_y_coordinate",
				"type": "int64"
			},
			{
				"internalType": "int64",
				"name": "_station_ID",
				"type": "int64"
			},
			{
				"internalType": "int64",
				"name": "_perUnitprice",
				"type": "int64"
			},
			{
				"internalType": "int64",
				"name": "_waitTime",
				"type": "int64"
			},
			{
				"internalType": "bool",
				"name": "_fastCharging",
				"type": "bool"
			},
			{
				"internalType": "int64",
				"name": "_rating",
				"type": "int64"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getCS",
		"outputs": [
			{
				"components": [
					{
						"internalType": "int64",
						"name": "distance",
						"type": "int64"
					},
					{
						"internalType": "int64",
						"name": "x_coordinate",
						"type": "int64"
					},
					{
						"internalType": "int64",
						"name": "y_coordinate",
						"type": "int64"
					},
					{
						"internalType": "int64",
						"name": "station_ID",
						"type": "int64"
					},
					{
						"internalType": "int64",
						"name": "PerUnitprice",
						"type": "int64"
					},
					{
						"internalType": "int64",
						"name": "waitTime_min",
						"type": "int64"
					},
					{
						"internalType": "bool",
						"name": "fastCharging",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "reachable",
						"type": "bool"
					},
					{
						"internalType": "int64",
						"name": "score",
						"type": "int64"
					},
					{
						"internalType": "int64",
						"name": "rating",
						"type": "int64"
					}
				],
				"internalType": "struct Evehicle.ChargingStation[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]

// connnecting to blockchain 
    provider.listAccounts().then(function (accounts) {
    signer = provider.getSigner(accounts[0]);
    evContract = new ethers.Contract(EVContractAddress, EVContractABI, signer);
    })
    // function to get inputs from user and pass it to backend
async function getDistance() {
    x = $("#Xcor").val();
    y = $("#Ycor").val();
	remaining_battery = $("#Battery_rem").val();
//   getBalancePromise = await evContract.computedistance(x,y);
//   console.log("compute distance is done");
//   remaining_battery = $("#Battery_rem").val();
getreachablePromise = await evContract.computedistance(x,y,remaining_battery);
//   getreachablePromise = await evContract.isreachable(remaining_battery);
  console.log("isreachable is done");
  getscorePromise = await evContract.compute_score();
  console.log("compute score is done");

  //calling display function to show result
 Display();
}

//function to display output in front-end
async function Display() {
    
    var csdetail=[]
    //getting values from backend
    csdetail = await evContract.getCS();
    console.log("getcs is done");
   
    //calculating length of array
    const len = await csdetail.length;
    console.log(len)
    console.log(csdetail[0].distance.toNumber())
    var j=0

    document.getElementById("id").innerHTML ='';
    
// looping over the array
    for (let i = 0; i < len; i++) {
        const temp = csdetail[i];
        console.log(temp.distance.toNumber()+ " Per unit price = "+ temp.PerUnitprice.toNumber()+" waiting time "+temp.waitTime_min.toNumber()+" Fast charging available = "+ temp.fastCharging+"Rating = "+temp.rating.toNumber()+"score= "+temp.score.toNumber())
        console.log(temp.score.toNumber() == 5+"score if condition ")
        let fastchrg = "No";
            if(temp.fastCharging){
                fastchrg ="yes"
            }
            
            // if(temp.score.toNumber() > 0){
               // calling function createcard
			   remaining_battery = $("#Battery_rem").val();
			   if(temp.distance.toNumber() < remaining_battery){
                createCard(j+1,temp.score.toNumber(),temp.distance.toNumber(),temp.PerUnitprice.toNumber(),temp.waitTime_min.toNumber(), fastchrg ,temp.rating.toNumber(),temp.reachable);
                j= j+1;}
            // }
            // else{
            //     // createCard(i+1,temp.score.toNumber(),temp.distance.toNumber(),temp.PerUnitprice.toNumber(),temp.waitTime_min.toNumber(), fastchrg ,temp.rating.toNumber(),"id"); 
            // }
            
    }

 }
// function to display reults in card view
const cs = document.querySelector(".container2");
function createCard(count,score,distance,perunitprice,waittime,fastcharg,rating,reachable){
    console.log("createcard function is called");
    console.log(count,score, distance,perunitprice,waittime,fastcharg,rating,reachable);
    var option="";
	remaining_battery = $("#Battery_rem").val();
	if(distance < remaining_battery){
		if((score==1) || (reachable && fastcharg && waittime<16 &&(distance < remaining_battery))){
			option= "Best Option"
		}else if(score ==2|| (reachable  && waittime<16) &&(distance < remaining_battery)){
			option= "Better Option"
		}else if(score ==3|| (reachable  && waittime>15 &&(distance < remaining_battery))){
			option= "Moderate Option"
		}else{
	
		}
	}
    
    let code = `
    <div class="card">
    <div class="box">
    <div class ="content">
        
        <div class ="cardText"> 
        <h2>${count}</h2>
        <h3>${option}</h3>
        <p class ="Distance"> Distance away from your location : ${distance} km</p>
        <p class="PerUnitPrice">Per unit Price : Rs ${perunitprice}</p>
        <p class="waittime">Waiting Time(min) : ${waittime} min</p>
        <p class="fastcharging">Fast charging : ${fastcharg}</p>
        <p class="rating">Rating : ${stars(rating)}</p>

        </div>

      
    </div>
    </div>
    </div>`;
    document.getElementById("id").innerHTML +=code;
}
//function to show stars for rating
function stars(times){
    
    if(times ==5){
        return `⭐⭐⭐⭐⭐` ;
    }else if(times ==4){
        return `⭐⭐⭐⭐` ;
    }else{
        return `⭐⭐⭐⭐` ;
    }
    
}
async function addcs() {
    
    xaxis = $("#xaxis").val();
    yaxis = $("#yaxis").val();
    ppu = $("#ppu").val();
    waittime =$("#waittime").val();
    fastchrg= $("#fastchrg").val();
    console.log(fastchrg);
    console.log(xaxis,yaxis,ppu,waittime,fastchrg);
    alert("Congratulations, you become a part of our family!!!!")
  getBalancePromise = await evContract.addChargingstation(xaxis,yaxis,ppu,waittime,fastchrg);
}