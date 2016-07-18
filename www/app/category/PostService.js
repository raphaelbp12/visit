angular.module('starter').service('PostService', ['Restangular', function(Restangular){

  this.getSlider = function() {
    return Restangular.all('api/v1/').customGET("slider").then(function(response) {
      console.log("getSlider");
      console.log(response.posts);
      return response.posts
    });
  }

   this.getAll = function(category, term_input, after){
      return Restangular.all('api/v1/').customGET("posts",{taxonomy: category, term: term_input, offset: after}).then(function(response) {
         console.log("getAll");
        console.log(response.posts);
        return response.posts
      });
    };

   this.getAllEvents = function(after){
      return Restangular.all('api/v1/').customGET("events",{offset: after}).then(function(response) {
         console.log("getAll");
         console.log(response.posts);
        return response.posts
      });
    };

   this.getSobre = function(){
      return Restangular.all('api/v1/').customGET("sobre").then(function(response) {
         console.log("getAll");
         console.log(response.posts);
        return response.posts
      });
    };

    this.getById = function(postid){
      return Restangular.all('api/v1/').customGET("post", {id: postid}).then(function(response) {
         console.log("getById");
         console.log(response.posts);
        return response.posts
      });
    };

    this.filterResponse = function(response){
      var telephone = "Não disponível";
      var website = "Não disponível";
      var email = "Não disponível";
      var time = "Sob consulta";
      var price = "Sob consulta";
      var address_street = "";
      var address_number = "";
      var address_neighbourhood = "";
      var address_complement = "";
      var city = "Rio de Janeiro - RJ"

      if (response.postmetas.data_final) {
        var date = response.postmetas.data_final;
        response.postmetas.data_final = new Date(date.slice(0,4), date.slice(4,6)-1, date.slice(6,8));

        var date = response.postmetas.data_inicio;
        response.postmetas.data_inicio = new Date(date.slice(0,4), date.slice(4,6)-1, date.slice(6,8));
      }

      if (response.postmetas.infos_evento_0_telefones_0_telefone) {
        telephone = response.postmetas.infos_evento_0_telefones_0_telefone;
      }

      if (response.postmetas.infos_evento_0_website) {
        website = response.postmetas.infos_evento_0_website;
      }

      if (response.postmetas.infos_evento_0_horario_de_funcionamento) {
        time = response.postmetas.infos_evento_0_horario_de_funcionamento;
      }

      if (response.postmetas.infos_evento_0_email) {
        email = response.postmetas.infos_evento_0_email;
      }

      if (response.postmetas.infos_evento_0_logradouro) {
        address_street = response.postmetas.infos_evento_0_logradouro;
      }

      if (response.postmetas.infos_evento_0_numero) {
        address_number = ", " + response.postmetas.infos_evento_0_numero;
      }

      if (response.postmetas.infos_evento_0_bairro) {
        address_neighbourhood = ", " + response.postmetas.infos_evento_0_bairro;
      }

      if (response.postmetas.infos_evento_0_complementp) {
        address_complement = response.postmetas.infos_evento_0_complementp;
      }


      if (response.postmetas.infos_0_telefones_0_telefone) {
        telephone = response.postmetas.infos_0_telefones_0_telefone;
      }

      if (response.postmetas.infos_0_website) {
        website = response.postmetas.infos_0_website;
      }

      if (response.postmetas.infos_0_horario_de_funcionamento) {
        time = response.postmetas.infos_0_horario_de_funcionamento;
      }

      if (response.postmetas.infos_0_email) {
        email = response.postmetas.infos_0_email;
      }

      if (response.postmetas.infos_0_logradouro) {
        address_street = response.postmetas.infos_0_logradouro;
      }

      if (response.postmetas.infos_0_numero) {
        address_number = ", " + response.postmetas.infos_0_numero;
      }

      if (response.postmetas.infos_0_bairro) {
        address_neighbourhood = ", " + response.postmetas.infos_0_bairro;
      }

      if (response.postmetas.infos_0_complemento) {
        address_complement = response.postmetas.infos_0_complemento;
      }

      response.telephone = telephone;
      response.price = price;
      response.website = website.replace("www.", "").replace("http://", "").replace("https://", "");
      response.time = time;
      response.email = email;
      response.city = city;
      response.address = address_street + address_number + address_complement + address_neighbourhood ;

      return response;
    };

}]);
