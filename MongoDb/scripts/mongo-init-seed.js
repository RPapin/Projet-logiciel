// Insert Datas
db.restaurant.insertMany([
  {
    "_id": 0,
    "manager_id" : "0",
    "address" : "Centre Cial Ecully Grand Ouest, 69130 Écully",
    "name" : "Restaurant Pizzeria d'Ecully",
    "description" : "",
    "tags" : "sur_place a_emporter aucune_livraison",
    "picture" : ""
  },
  {
    "_id": 1,
    "manager_id" : "0",
    "address" : "10 Route du Perollier, 69570 Dardilly",
    "name" : "Les marches",
    "description" : "",
    "tags" : "sur_place aucune_livraison",
    "picture" : ""
  },
  {
    "_id": 2,
    "manager_id" : "0",
    "address" : "7 Place de l'Église, 69570 Dardilly",
    "name" : "L'Auberge du Village",
    "description" : "",
    "tags" : "sur_place aucune_livraison",
    "picture" : ""
  }
]);

db.product.insert({
  "_id": 0,
  "restaurant_id" : 0,
  "type" : "food",
  "name" : "Pizza Reine",
  "description" : "Une pizza delicieuse",
  "price" : "10,00€",
  "estimation_time" : "40",
  "picture" : ""
});

db.product.insert({
  "_id": 1,
  "restaurant_id" : 0,
  "type" : "food",
  "name" : "Pizza Carnivore",
  "description" : "Une pizza delicieuse",
  "price" : "10,00€",
  "estimation_time" : "40",
  "picture" : ""
});

db.product.insert({
  "_id": 2,
  "restaurant_id" : 0,
  "type" : "food",
  "name" : "Pizza Hawaïenne",
  "description" : "Une pizza delicieuse",
  "price" : "10,00€",
  "estimation_time" : "40",
  "picture" : ""
});

db.product.insert({
  "_id": 3,
  "restaurant_id" : 0,
  "type" : "food",
  "name" : "Pizza Norvegienne",
  "description" : "Une pizza delicieuse",
  "price" : "10,00€",
  "estimation_time" : "40",
  "picture" : ""
});

db.product.insert({
  "_id": 4,
  "restaurant_id" : 0,
  "type" : "drink",
  "name" : "Coca-Cola",
  "description" : "Une boisson delicieuse",
  "price" : "2,00€",
  "estimation_time" : "0",
  "picture" : ""
});

db.product.insert({
  "_id": 5,
  "restaurant_id" : 0,
  "type" : "sauce",
  "name" : "Sauce piquante",
  "description" : "Une sauce delicieuse",
  "price" : "0,00€",
  "estimation_time" : "0",
  "picture" : ""
});

db.menu.insert({
  "_id": 0,
  "restaurant_id" : 0,
  "name" : "Menu Pizza Reine",
  "description" : "Un menu delicieux",
  "price" : "11,50€",
  "estimation_time" : "40",
  "picture" : "",
  "menu_composition" : [
    {
      "product_id" : 0,
      "quantity" : 1
    },
    {
      "product_id" : 4,
      "quantity" : 1
    },
    {
      "product_id" : 5,
      "quantity" : 4
    }
  ]
});