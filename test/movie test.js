const chai= require("chai");
const chaiHttp=require("chai-http");
const should= chai.should();
const server=require("../app");

chai.use(chaiHttp);


let token,movieId;


describe("api movies test",()=>{
  before((done)=>{
      chai.request(server)
          .post('/authenticate')
          .send({name:"ali" ,password:"1234567"})
          .end((err,res)=>{
            token=res.body.token;
            done();
          });
  });

describe("get movies",()=>{
    it("it should get all the movies",(done)=>{
        chai.request(server)
            .get("/api/movie")
            .set("x-access-token",token)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a("array");
                done();
            });
    });
});
describe("post movie",()=>{
    it("it should post a movie",(done)=>{
        const movie={
            title:"udemy",
            director_id:"5f8c303905f35b37ec70975f",
            category:"coding",
            country:"turkey",
            year:2015
        };
        chai.request(server)
            .post("/api/movie")
            .send(movie)
            .set("x-access-token",token)
            .end((err,res)=>{
                res.should.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("title");
                res.body.should.have.property("director_id");
                res.body.should.have.property("category");
                res.body.should.have.property("country");
                res.body.should.have.property("year");
                movieId=res.body._id;
                done();
            });
    });
});
describe("/get/: director_id",()=>{
    it('it should get a movie by the given id ',  (done)=> {
        chai.request(server)
            .get("/api/movie/"+movieId)
            .set("x-access-token",token)
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a("object");
                res.body.should.have.property("title");
                res.body.should.have.property("director_id");
                res.body.should.have.property("category");
                res.body.should.have.property("country");
                res.body.should.have.property("year");
                res.body.should.have.property("_id").eql(movieId);
                done();
            });


    });
});

    describe("/put/:director_id movie",()=>{
        it("it should put a movie",(done)=>{
            const movie={
                title:"mit",
                director_id:"5f8c303905f35b37ec70975f",
                category:"cod",
                country:"usa",
                year:2009
            };
            chai.request(server)
                .put("/api/movie/"+movieId)
                .send(movie)
                .set("x-access-token",token)
                .end((err,res)=>{
                    res.should.status(200);
                    res.body.should.be.a("object");
                    res.body.should.have.property("title").eql(movie.title);
                    res.body.should.have.property("director_id").eql(movie.director_id);
                    res.body.should.have.property("category").eql(movie.category);
                    res.body.should.have.property("country").eql(movie.country);
                    res.body.should.have.property("year").eql(movie.year);
                    done();
                });
        });
    });
    describe("/delete/:director_id movie",()=>{
        it("it should delete a movie",(done)=>{

            chai.request(server)
                .delete("/api/movie/"+movieId)
                .set("x-access-token",token)
                .end((err,res)=>{
                    res.should.status(200);
                    res.body.should.be.a("object");
                    res.body.should.have.property("status").eql(1);
                    done();
                });
        });
    });


});

