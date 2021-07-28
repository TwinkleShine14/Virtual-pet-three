var dog
var happyDog
var database
var foodS
var foodstock
var gameState
var bg
function preload()
{
	dog=loadImage("images/dogImg.png")
  happyDog=loadImage("images/dogImg1.png")
  BedRoom = loadImage ("images/Bed Room.png")
  Garden = loadImage ("images/Garden.png")
  WashRoom = loadImage ("images/Wash Room.png")
  LivingRoom = loadImage ("images/Living Room.png")
  Lazy = loadImage ("images/Lazy.png")

}


function setup() {
	createCanvas(600, 550);
  database=firebase.database();

  bg= createSprite(300, 150)
  foodobj= new Food()

  dog1= createSprite(800,200,5,5)
  dog1.addImage(dog)
dog1.scale= 0.2
  foodStock = database.ref('Food')
  foodStock.on("value", readStock)
gameStates = database.ref('gameState')
gameStates.on ("value", function(data){
  gameState= data.val()
})
  feed= createButton("feed the dog")
  feed.position(700,95)
  feed.mousePressed(feedDog)

  addFood= createButton("Add Food")
  addFood.position(800,95)
  addFood.mousePressed(addFoods)
}


function draw() {  


  foodobj.display()
  
  if(gameState === 0){
   bg.addImage(Garden, 500, 550)
  }
if(foodS >4 && foodS < 8){
  bg.addImage(LivingRoom, 500,550)
}
if(foodS> 0 && foodS< 5){
  bg.addImage(WashRoom, 500,550)
}
if(foodS === 0){
  background(0)
  bg.addImage(Lazy, 500,550)
}
  drawSprites();
}

function feedDog(){
  dog1.addImage (happyDog)
  foodobj.updateFoodStock(foodobj. getFoodStock()- 1)
  database.ref('/').update({
    Food:foodobj.getFoodStock()
  })
}

function addFoods(){
  foodS++
  database.ref('/').update({
    Food:foodS
  })
}

function readStock (data){
  foodS = data.val();
  foodobj.updateFoodStock(foodS)
}

function writeStock(x){
  if (x>0){
    x=x-1
  }
  else {
    x=0
  }
  database.ref('/').update({Food:x})
}

