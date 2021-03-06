const Player = require("../models/player.model.js");

exports.test = function(req,res){
  res.send("Looks quite good!!!");
} //the basic testing querry!!!

exports.search = function(req,res){
  Player.find({position : req.params.club},function(error,players){
    if(error)
    return(error);
    res.json(players); //the collection is the output!!!
  });
  //searches player as per position!!!
};

exports.sort = function(req,res){
  Player.find({}).sort({rating:-1}).find({position:req.params.pos},function(error,players){ //decreasing order of player ratings!!!
    if(error)
    return (error);
    res.json(players);
  });
  //sorts player according to their ratings for a particular position!!!
};


//the function to create a new Player object!!!
exports.create = function(req,res){
  let player = new Player({
    name : req.body.name,
    age : req.body.age,
    club : req.body.club,
    position : req.body.position
  });

  player.save (function(error){
    if(error){
      return(error);
    }
    res.send("Player created successfully!!!");
  });

};

//the function to read a Player object in json
exports.read = function(req,res){
  //var idd="5c306ea8617f7d12101711c9";
  Player.findById(req.params.id,function(error,product){
    if(error){
      return(error);
    }

    res.send(product);
  });

};

//the function to update a Player object!!! 
exports.update = function(req,res){
  Player.findByIdAndUpdate(req.params.id,{$set:req.body},function(error){
    if(error){
      return(error);
    }
    res.send("Player is updated successfully!!!");
  });
}


//the function to delete a Player object!!!
exports.delete = function(req,res){
  Player.findByIdAndRemove(req.params.id,function(error){ // player is removed with reference to id
    res.send("Player removed successfully!!!");
  });
};
