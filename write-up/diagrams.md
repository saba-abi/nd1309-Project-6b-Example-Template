# UML Diagrams

If you are using vscode you can use the [Markdown Plantuml Preview](https://marketplace.visualstudio.com/items?itemName=myml.vscode-markdown-plantuml-preview) plugin to preview this .md file with rendered PlantUML diagrams.

You can also paste the PlantUML codes to http://www.plantuml.com/plantuml/uml/

## Activity Diagram

```plantuml
@startuml
partition Farmer {
  (*) --> "harvest coffee"
  --> "process coffee"
  --> "pack coffee"
  --> "sell coffee"
}
partition Distributor {
  --> "buy coffee"
  --> "ship coffee"
}
partition Retailer {
  --> "receive coffee"
}
partition consumer {
  --> "purchaise coffee"
  --> "validate authenticity"
  -->(*)
}
@enduml
```

## Sequence Diagram

```plantuml
@startuml
activate Farmer
CoffeeSupplyChain<-Farmer:harvestItem
activate CoffeeSupplyChain
CoffeeSupplyChain<-Farmer:processItem
CoffeeSupplyChain<-Farmer:packItem
CoffeeSupplyChain<-Farmer:sellItem
deactivate Farmer
activate Distributor
CoffeeSupplyChain<-Distributor:buyItem
CoffeeSupplyChain<-Distributor:shipItem
deactivate Distributor
activate Retailer
CoffeeSupplyChain<-Retailer:receiveItem
deactivate Retailer
activate Consumer
CoffeeSupplyChain<-Consumer:purchaseItem
CoffeeSupplyChain<-Consumer:fetchItemBufferOne
CoffeeSupplyChain-->Consumer:itemDetailsOne
CoffeeSupplyChain<-Consumer:fetchItemBufferTwo
CoffeeSupplyChain-->Consumer:itemDetailsTwo
deactivate CoffeeSupplyChain
@enduml
```

## State Diagram

```plantuml
@startuml
title State Diagram
hide empty description
state Coffee {
  [*] --> harvested
  harvested --> processed
  processed --> packed
  packed --> forSale
  forSale --> sold
  sold --> shipped
  shipped --> received
  received --> purchased
  purchased --> [*]
}
state Farmer {
  harvested --> owner1
  owner1 --> notOwner1
  sold --> notOwner1
  notOwner1 --> [*]
}
state Distributor {
  sold --> owner2
  owner2 --> notOwner2
  received --> notOwner2
  notOwner2 --> [*]
}
state Retailer {
  received --> owner3
  owner3 --> notOwner3
  purchased --> notOwner3
  notOwner3 --> [*]
}
state Consumer {
  purchased --> owner4
  owner4 --> [*]
}
@enduml
```

## Class Diagram
```plantuml
@startuml
class Ownable {
  - origOwner
  .. events ..
  TransferOwnership(oldOwner: address, newOwner: address)
  .. methods ..
  + owner(): address
  + isOwner(): bool
  + renounceOwnership()
  + transferOwnership()
}
class SupplyChain {
  upc: uint
  sku: uint
  items: uint => Item
  .. events ..
  Harvested(upc: uint)
  Processed(upc: uint)
  Packed(upc: uint)
  ForSale(upc: uint)
  Sold(upc: uint)
  Shipped(upc: uint)
  Received(upc: uint)
  Purchased(upc: uint)
  .. methods ..
  + harvestItem(upc: uint, originFarmerID: address, originFarmName: string, originFarmInformation: string, originFarmLatitude: string, originFarmLongitude: string, productNotes: string)
  + processItem(upc: uint)
  + packItem(upc: uint)
  + sellItem(upc: uint, price: uint)
  + buyItem(upc: uint)
  + shipItem(upc: uint)
  + receiveItem(upc: uint)
  + purchaseItem(upc: uint)
  + fetchItemBufferOne(): [itemSKU: uint, itemUPC: uint, ownerID: address, originFarmerID: address, originFarmName: string, originFarmInformation: string, originFarmLatitude: string, originFarmLongitude: string]
  + fetchItemBufferTwo()
}
class ConsumerRole {
  - consumers: address => bool
  .. events ..
  ConsumerAdded(account: address)
  ConsumerRemoved(account: address)
  .. methods ..
  + isConsumer(account: address): bool
  + addConsumer(account: address)
  + renounceConsumer()
}
class DistributorRole {
  - distributors: address => bool
  .. events ..
  DistributorAdded(account: address)
  DistributorRemoved(account: address)
  .. methods ..
  + isDistributor(account: address): bool
  + addDistributor(account: address)
  + renounceDistributor()
}
class FarmerRole {
  - farmers: address => bool
  .. events ..
  FarmerAdded(account: address)
  FarmerRemoved(account: address)
  .. methods ..
  + isFarmer(account: address): bool
  + addFarmer(account: address)
  + renounceFarmer()
}
class RetailerRole {
  - retailers: address => bool
  .. events ..
  ReailerAdded(account: address)
  ReailerRemoved(account: address)
  .. methods ..
  + isReailer(account: address): bool
  + addReailer(account: address)
  + renounceReailer()
}
interface Item {
  sku: uint
  upc: uint
  ownerID: address
  originFarmerID: address
  originFarmName: string
  originFarmInformation: string
  originFarmLatitude: string
  originFarmLongitude: string
  productID: uint
  productNotes: string
  productPrice: uint
  itemState: State
  distributorID
  retailerID: address
  consumerID: address
}
enum State {
  Harvested
  Processed
  Packed
  ForSale
  Sold
  Shipped
  Received
  Purchased
}
Ownable <|-- SupplyChain
SupplyChain <|-- ConsumerRole
SupplyChain <|-- DistributorRole
SupplyChain <|-- FarmerRole
SupplyChain <|-- RetailerRole
SupplyChain --> Item
Item --> State
@enduml
```
