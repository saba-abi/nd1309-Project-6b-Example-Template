App = {
    web3Provider: null,
    contracts: {},
    emptyAddress: "0x0000000000000000000000000000000000000000",
    metamaskAccountID: "0x0000000000000000000000000000000000000000",

    form: {
        upc: 0,
        originFarmerID: "0x0000000000000000000000000000000000000000",
        originFarmName: null,
        originFarmInformation: null,
        originFarmLatitude: null,
        originFarmLongitude: null,
        productNotes: null,
        productPrice: 0,
        distributorID: "0x0000000000000000000000000000000000000000",
        retailerID: "0x0000000000000000000000000000000000000000",
        consumerID: "0x0000000000000000000000000000000000000000",
    },

    init: async function () {
        /// Setup access to blockchain
        return await App.initWeb3();
    },

    readForm: function () {
        App.form.upc = $("#upc").val();
        App.form.originFarmerID = $("#originFarmerID").val();
        App.form.originFarmName = $("#originFarmName").val();
        App.form.originFarmInformation = $("#originFarmInformation").val();
        App.form.originFarmLatitude = $("#originFarmLatitude").val();
        App.form.originFarmLongitude = $("#originFarmLongitude").val();
        App.form.productNotes = $("#productNotes").val();
        App.form.productPrice = $("#productPrice").val();
        App.form.distributorID = $("#distributorID").val();
        App.form.retailerID = $("#retailerID").val();
        App.form.consumerID = $("#consumerID").val();
        console.log('form', App.form);
    },

    initWeb3: async function () {
        /// Find or Inject Web3 Provider
        /// Modern dapp browsers...
        if (window.ethereum) {
            App.web3Provider = window.ethereum;
            try {
                // Request account access
                await window.ethereum.enable();
            } catch (error) {
                // User denied account access...
                console.error("User denied account access")
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            App.web3Provider = window.web3.currentProvider;
        }
        // If no injected web3 instance is detected, fall back to Ganache
        else {
            App.web3Provider = new Web3.providers.HttpProvider('http://localhost:9545');
        }

        return App.initSupplyChain();
    },

    getMetaskAccountID: async function () {
        web3 = new Web3(App.web3Provider);

        // Retrieving accounts
        const accounts = await new Promise((resolve, reject) => {
            web3.eth.getAccounts(function(err, res) {
                if (err) reject(err);
                resolve(res);
            });
        });

        console.log('getMetaskID:', accounts);
        App.metamaskAccountID = accounts[0];
    },

    initSupplyChain: function () {
        /// Source the truffle compiled smart contracts
        const jsonSupplyChain='../../build/contracts/SupplyChain.json';
        
        /// JSONfy the smart contracts
        $.getJSON(jsonSupplyChain, function(data) {
            console.log('data', data);
            const SupplyChainArtifact = data;
            App.contracts.SupplyChain = TruffleContract(SupplyChainArtifact);
            App.contracts.SupplyChain.setProvider(App.web3Provider);
            
            App.fetchItemBufferOne();
            App.fetchItemBufferTwo();
            App.fetchEvents();
        });

        return App.bindEvents();
    },

    bindEvents: function() {
        $(document).on('click', App.handleButtonClick);
    },

    handleButtonClick: async function(event) {
        event.preventDefault();

        const processId = parseInt($(event.target).data('id'));
        if (!processId) return;

        console.log('processId', processId);

        await App.getMetaskAccountID();
        App.readForm();

        switch(processId) {
            case 1:
                await App.harvestItem();
                break;
            case 2:
                await App.processItem();
                break;
            case 3:
                await App.packItem();
                break;
            case 4:
                await App.sellItem();
                break;
            case 5:
                await App.buyItem();
                break;
            case 6:
                await App.shipItem();
                break;
            case 7:
                await App.receiveItem();
                break;
            case 8:
                await App.purchaseItem();
                break;
            case 9:
                await App.fetchItemBufferOne();
                break;
            case 10:
                await App.fetchItemBufferTwo();
                break;
            case 11:
                await App.addFarmer();
                break;
            case 12:
                await App.addDistributor();
                break;
            case 13:
                await App.addRetailer();
                break;
            case 14:
                await App.addConsumer();
                break;
        }
    },

    addFarmer: async function() {
        await App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.addFarmer(App.form.originFarmerID, { from: App.metamaskAccountID });
        }).then(function(result) {
            console.log('addFarmer', result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    addDistributor: async function() {
        await App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.addDistributor(App.form.distributorID, { from: App.metamaskAccountID});
        }).then(function(result) {
            console.log('addDistributor', result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    addRetailer: async function() {
        await App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.addRetailer(App.form.retailerID, { from: App.metamaskAccountID});
        }).then(function(result) {
            console.log('addRetailer', result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    addConsumer: async function() {
        await App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.addConsumer(App.form.consumerID, { from: App.metamaskAccountID});
        }).then(function(result) {
            console.log('addConsumer', result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    harvestItem: async function() {
        await App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.harvestItem(
                App.form.upc, 
                App.metamaskAccountID, 
                App.form.originFarmName, 
                App.form.originFarmInformation, 
                App.form.originFarmLatitude, 
                App.form.originFarmLongitude, 
                App.form.productNotes,
                { from: App.form.originFarmerID }
            );
        }).then(function(result) {
            console.log('harvestItem', result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    processItem: async function () {
        await App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.processItem(App.form.upc, { from: App.form.originFarmerID });
        }).then(function(result) {
            console.log('processItem', result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },
    
    packItem: async function () {
        await App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.packItem(App.form.upc, { from: App.form.originFarmerID });
        }).then(function(result) {
            console.log('packItem', result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    sellItem: async function () {
        await App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.sellItem(App.form.upc, App.form.productPrice, { from: App.form.originFarmerID });
        }).then(function(result) {
            console.log('sellItem', result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    buyItem: async function () {
        await App.contracts.SupplyChain.deployed().then(function(instance) {
            const walletValue = web3.toWei(2000000, "gwei");
            return instance.buyItem(App.form.upc, { from: App.form.distributorID, value: walletValue });
        }).then(function(result) {
            console.log('buyItem', result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    shipItem: async function () {
        await App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.shipItem(App.form.upc, { from: App.form.distributorID });
        }).then(function(result) {
            console.log('shipItem', result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    receiveItem: async function () {
        await App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.receiveItem(App.form.upc, { from: App.form.retailerID });
        }).then(function(result) {
            console.log('receiveItem', result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    purchaseItem: async function () {
        await App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.purchaseItem(App.form.upc, { from: App.form.consumerID });
        }).then(function(result) {
            console.log('purchaseItem', result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    fetchItemBufferOne: async function () {
        await App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.fetchItemBufferOne(App.form.upc);
        }).then(function(result) {
            const info = {
                itemSKU: result[0].toString(),
                itemUPC: result[1].toString(),
                ownerID: result[2],
                originFarmerID: result[3],
                originFarmName: result[4],
                originFarmInformation: result[5],
                originFarmLatitude: result[6],
                originFarmLongitude: result[7]
            };
            console.log('fetchItemBufferOne', info);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    fetchItemBufferTwo: async function () {                    
        await App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.fetchItemBufferTwo.call(App.form.upc);
        }).then(function(result) {
            const info = {
                itemSKU: result[0].toString(),
                itemUPC: result[1].toString(),
                productID: result[2].toString(),
                productNotes: result[3],
                productPrice: result[4].toString(),
                itemState: result[5].toString(),
                distributorID: result[6],
                retailerID: result[7],
                consumerID: result[8]
            };
            console.log('fetchItemBufferTwo', info);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    fetchEvents: function () {
        if (typeof App.contracts.SupplyChain.currentProvider.sendAsync !== "function") {
            App.contracts.SupplyChain.currentProvider.sendAsync = function () {
                return App.contracts.SupplyChain.currentProvider.send.apply(
                App.contracts.SupplyChain.currentProvider,
                    arguments
              );
            };
        }

        App.contracts.SupplyChain.deployed().then(function(instance) {
        instance.allEvents(function(err, log){
            if (!err)
                $("#ftc-events").append('<li>' + log.event + ' - ' + log.transactionHash + '</li>');
        });
        }).catch(function(err) {
            console.log(err.message);
        });
        
    }
};

$(function () {
    $(window).load(function () {
        App.init();
    });
});
