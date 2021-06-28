// Create Collections
db.createCollection( "restaurant",
   {
     capped: false,
     autoIndexId: true,
     validator: {
       $jsonSchema : {
         bsonType : ["object"],
         title : "restaurant",
         description : "restaurants collection",
         properties : {
           _id : {
             bsonType : ["objectId"]
           },
           manager_id : {
             bsonType : ["int"]
           },
           address : {
             bsonType : ["string"]
           },
           name : {
             bsonType : ["string"]
           },
           description : {
             bsonType : ["string"]
           },
           tags : {
             bsonType : ["string"]
           },
           picture : {
             bsonType : ["string"]
           }
         }
       }
      }
   }
);

db.createCollection( "product",
   {
     capped: false,
     autoIndexId: true,
     validator: {
       $jsonSchema : {
         bsonType : ["object"],
         title : "product",
         description : "products collection",
         properties : {
           _id : {
             bsonType : ["objectId"]
           },
           restaurant_id : {
             bsonType : ["objectId"]
           },
           type : {
             bsonType : ["string"],
             enum : [
               "food",
               "sauce",
               "drink"
             ]
           },
           name : {
             bsonType : ["string"]
           },
           description : {
             bsonType : ["string"]
           },
           price : {
             bsonType : "float"
           },
           estimation_time : {
             bsonType : ["int"]
           },
           picture : {
             bsonType : ["string"]
           }
         }
       }
       }
   }
);

db.createCollection( "menu",
   {
     capped: false,
     autoIndexId: true,
     validator: {
       $jsonSchema : {
         bsonType : "object",
         title : "menu",
         description : "menus collection",
         properties : {
           _id : {
             bsonType : ["objectId"]
           },
           restaurant_id : {
             bsonType : ["objectId"]
           },
           name : {
             bsonType : ["string"]
           },
           description : {
             bsonType : ["string"]
           },
           price : {
             bsonType : "float"
           },
           estimation_time : {
             bsonType : ["int"]
           },
           picture : {
             bsonType : ["string"]
           },
           menu_composition : {
              bsonType: ["array"],
              minItems: 1, // each menu must have at least one product
              uniqueItems: true,
              additionalProperties: false,
              items: {
                  bsonType: ["object"],
                  required: ["product_id", "quantity"],
                  additionalProperties: false,
                  description: "",
                  properties: {
                      product_id: {
                        bsonType: ["objectId"]
                      },
                      quantity: {
                        bsonType: ["int"]
                      }
                  }
              }
           }
         }
       }
     }
   }
);

db.createCollection( "order",
   {
     capped: false,
     autoIndexId: true,
     validator: {
       $jsonSchema : {
         bsonType : "object",
         title : "order",
         description : "orders collection",
         properties : {
           _id : {
             bsonType : ["objectId"]
           },
           restaurant_id : {
             bsonType : ["objectId"]
           },
           client_id : {
             bsonType : ["int"]
           },
           state : {
             bsonType : ["string"],
             enum : [
               "placing",
               "validation",
               "delivery accepted",
               "delivery received"
             ]
           },
           qrcode : {
             bsonType : "string"
           },
           order_items : {
             bsonType: ["array"],
              minItems: 1, // each menu must have at least one product
              uniqueItems: true,
              additionalProperties: false,
              items: {
                  bsonType: ["object"],
                  required: ["item_id", "item_type", "quantity"],
                  additionalProperties: false,
                  description: "",
                  properties: {
                      item_id: {
                        bsonType: ["objectId"]
                      },
                      item_type: {
                        bsonType: ["string"],
                        enum: [
                          "menu",
                          "product"
                        ]
                      },
                      quantity: {
                        bsonType: ["int"]
                      }
                  }
              }
           }
         }
       }
     }
   }
);

db.createCollection( "evaluation",
   {
     capped: false,
     autoIndexId: true,
     validator: {
            $jsonSchema : {
              bsonType : "object",
              title : "evaluation",
              description : "evaluations collection",
              properties : {
                _id : {
                  bsonType : ["objectId"]
                },
                restaurant_id : {
                  bsonType : ["objectId"]
                },
                order_id : {
                  bsonType : ["objectId"]
                },
                client_id : {
                  bsonType : ["int"]
                },
                note : {
                  bsonType : ["int"]
                }
              }
            }
     }
   }
);