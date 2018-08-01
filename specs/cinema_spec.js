const assert = require('assert');
const Cinema = require('../models/cinema.js');
const Film = require('../models/film.js');

describe('Cinema', function () {

  let moonlight;
  let bladeRunner;
  let dunkirk;
  let blackPanther;
  let trainspotting;
  let films;
  let cinema;

  beforeEach(function () {
    moonlight = new Film('Moonlight', 'drama', 2016, 111);
    bladeRunner = new Film('Blade Runner 2049', 'sci-fi', 2017, 164);
    dunkirk = new Film('Dunkirk', 'history', 2017, 96);
    blackPanther = new Film('Black Panther', 'action', 2018, 134);
    trainspotting = new Film('T2 Trainspotting', 'drama', 2017, 117);

    films = [moonlight, bladeRunner, dunkirk, blackPanther, trainspotting];
    cinema = new Cinema(films);
  });

  it('should have a collection of films', function () {
    const actual = cinema.films;
    assert.deepStrictEqual(actual, films);
  });

  it('should be able to get a list of film titles', function (){
    const result = cinema.listOfTitles();
    assert.deepStrictEqual(result.length, 5)
  });

  it('should be able to find a film by title', function (){
    const result = cinema.findFilmByTitle("Dunkirk");
    assert.deepStrictEqual(result, dunkirk);
  });

  it('should be able to filter films by property', function(){
    const result = cinema.getFilmsByProperty("genre", "drama");
    assert.deepStrictEqual(result.length, 2)
    const result2 = cinema.getFilmsByProperty("year", 2017);
    assert.deepStrictEqual(result2.length, 3)
    const result3 = cinema.getFilmsByProperty("duration", 111);
    assert.deepStrictEqual(result3.length, 1)
  });

  it('should be able to check whether there are some films from a particular year or not', function(){
    let result = cinema.filmFromYearExists(2017);
    assert.strictEqual(result, true);
    result = cinema.filmFromYearExists(1900);
    assert.strictEqual(result, false);
  });

  it('should be able to check whether all films are over a particular length', function(){
    const result = cinema.allFilmsLongerThan(60);
    assert.strictEqual(result, true)
  });

  it('should be able to calculate total running time of all films', function(){
    const result = cinema.getTotalRunTimeOfAll();
    assert.deepStrictEqual(result, 622);
  });

});

module.exports = Cinema;
