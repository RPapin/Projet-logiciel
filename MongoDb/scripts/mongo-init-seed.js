// Insert Datas
db.restaurant.insertMany([
  {
    "manager_id" : "0",
    "address" : "Centre Cial Ecully Grand Ouest, 69130 Écully",
    "name" : "Restaurant Pizzeria d'Ecully",
    "description" : "",
    "tags" : "sur_place a_emporter aucune_livraison",
    "picture" : ""
  },
  {
    "manager_id" : "0",
    "address" : "10 Route du Perollier, 69570 Dardilly",
    "name" : "Les marches",
    "description" : "",
    "tags" : "sur_place aucune_livraison",
    "picture" : ""
  },
  {
    "manager_id" : "0",
    "address" : "7 Place de l'Église, 69570 Dardilly",
    "name" : "L'Auberge du Village",
    "description" : "",
    "tags" : "sur_place aucune_livraison",
    "picture" : ""
  }
]);

db.product.insert({
  "restaurant_id" : db.restaurant.findOne({name: "Restaurant Pizzeria d'Ecully"}),
  "type" : "food",
  "name" : "Pizza Reine",
  "description" : "Une pizza delicieuse",
  "price" : 10.00,
  "estimation_time" : 40,
  "picture" : ""
});

db.product.insert({
  "restaurant_id" : db.restaurant.findOne({name: "Restaurant Pizzeria d'Ecully"}),
  "type" : "food",
  "name" : "Pizza Carnivore",
  "description" : "Une pizza delicieuse",
  "price" : 10.00,
  "estimation_time" : 40,
  "picture" : ""
});

db.product.insert({
  "restaurant_id" : db.restaurant.findOne({name: "Restaurant Pizzeria d'Ecully"}),
  "type" : "food",
  "name" : "Pizza Hawaïenne",
  "description" : "Une pizza delicieuse",
  "price" : 10.00,
  "estimation_time" : 40,
  "picture" : ""
});

db.product.insert({
  "restaurant_id" : db.restaurant.findOne({name: "Restaurant Pizzeria d'Ecully"}),
  "type" : "food",
  "name" : "Pizza Norvegienne",
  "description" : "Une pizza delicieuse",
  "price" : 10.00,
  "estimation_time" : 40,
  "picture" : ""
});

db.product.insert({
  "restaurant_id" : db.restaurant.findOne({name: "Restaurant Pizzeria d'Ecully"}),
  "type" : "drink",
  "name" : "Coca-Cola",
  "description" : "Une boisson delicieuse",
  "price" : 2.00,
  "estimation_time" : 0,
  "picture" : ""
});

db.product.insert({
  "restaurant_id" : db.restaurant.findOne({name: "Restaurant Pizzeria d'Ecully"}),
  "type" : "sauce",
  "name" : "Sauce piquante",
  "description" : "Une sauce delicieuse",
  "price" : 0.00,
  "estimation_time" : 0,
  "picture" : ""
});

db.product.insert({
  "restaurant_id" : db.restaurant.findOne({name: "Les marches"}),
  "type" : "drink",
  "name" : "Nuka-Cola",
  "description" : "Une boisson delicieuse",
  "price" : 2.00,
  "estimation_time" : 0,
  "picture" : ""
});

db.product.insert({
  "restaurant_id" : db.restaurant.findOne({name: "L'Auberge du Village"}),
  "type" : "drink",
  "name" : "Pepsi-Cola",
  "description" : "Une boisson delicieuse",
  "price" : 2.00,
  "estimation_time" : 0,
  "picture" : ""
});

db.menu.insert({
  "restaurant_id" : db.restaurant.findOne({name: "Restaurant Pizzeria d'Ecully"}),
  "name" : "Menu Pizza Reine",
  "description" : "Un menu delicieux",
  "price" : 11.50,
  "estimation_time" : 40,
  "picture" : "",
  "menu_composition" : [
    {
      "product_id" : db.product.findOne({name: "Pizza Reine"}),
      "quantity" : 1
    },
    {
      "product_id" : db.product.findOne({name: "Coca-Cola"}),
      "quantity" : 1
    },
    {
      "product_id" : db.product.findOne({name: "Sauce piquante"}),
      "quantity" : 4
    }
  ]
});

db.menu.insert({
  "restaurant_id" : db.restaurant.findOne({name: "Restaurant Pizzeria d'Ecully"}),
  "name" : "Menu Norvegien",
  "description" : "Un menu delicieux",
  "price" : 11.50,
  "estimation_time" : 40,
  "picture" : "",
  "menu_composition" : [
    {
      "product_id" : db.product.findOne({name: "Pizza Norvegienne"}),
      "quantity" : 1
    },
    {
      "product_id" : db.product.findOne({name: "Coca-Cola"}),
      "quantity" : 1
    },
    {
      "product_id" : db.product.findOne({name: "Sauce piquante"}),
      "quantity" : 4
    }
  ]
});

db.adminInfo.insert({
  "type" : "init",
  "value" : "init db schema data",
  "date" : 0
});