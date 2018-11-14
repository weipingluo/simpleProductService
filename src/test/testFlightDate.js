import FlightDate from '../shared/FlightDate';
var assert = require('assert');
var expect = require("chai").expect;
describe('FlightDate', function() {
    describe('isOverlapped()', function(){
        it ('should return true when two flight dates overlapped', function() {
            var fd1 = new FlightDate("2018-01-01", "2018-01-31");
            var fd2 = new FlightDate("2018-01-31", "2018-02-28");
            assert.equal(fd1.isOverlappedWith(fd2), true);
            assert.equal(fd2.isOverlappedWith(fd1), true);
            assert.equal(fd1.isOverlappedWith(fd1), true);
        });
        it ('should return true when one fully covers another', function() {
            var fd1 = new FlightDate("2018-01-01", "2018-01-31");
            var fd2 = new FlightDate("2017-01-31", "2018-02-28");
            assert.equal(fd1.isOverlappedWith(fd2), true);
            assert.equal(fd2.isOverlappedWith(fd1), true);
        });
        it ('should return false when two flight dates are adjacent', function() {
            var fd1 = new FlightDate("2018-01-01", "2018-01-31");
            var fd2 = new FlightDate("2018-02-01", "2018-02-28");
            assert.equal(fd1.isOverlappedWith(fd2), false);
            assert.equal(fd2.isOverlappedWith(fd1), false);
        });
        it ('should return false when two flight dates are seperated', function() {
            var fd1 = new FlightDate("2018-01-01", "2018-01-31");
            var fd2 = new FlightDate("2018-03-01", "2018-03-31");
            assert.equal(fd1.isOverlappedWith(fd2), false);
            assert.equal(fd2.isOverlappedWith(fd1), false);
        });
        it ('should throw exception if input objects is not a flightdate', function() {
            var fd1 = new FlightDate("2018-01-31", "2018-02-31");
            var randomStr = "random string";
            var randomNum = 1213;
            var randomArray = ["a", "b"];
            var randomObject = {"a":123, "b":"daf"};
            assert.throws(() => fd1.isOverlappedWith(randomStr), Error, "Paramenter type error");
            assert.throws(() => fd1.isOverlappedWith(randomNum), Error, "Paramenter type error");
            assert.throws(() => fd1.isOverlappedWith(randomArray), Error, "Paramenter type error");
            assert.throws(() => fd1.isOverlappedWith(randomObject), Error, "Paramenter type error");
        });
    });
    describe('isAdjacent()', function() {
        it ('should return true when one endDate is one day before another startdate', function() {
            var fd1 = new FlightDate("2018-01-01", "2018-01-31");
            var fd2 = new FlightDate("2018-02-01", "2018-03-31");
            assert.equal(fd1.isAdjacentWith(fd2), true);
            assert.equal(fd2.isAdjacentWith(fd1), true);
        });
        it ('should return false when two are overlapped', function() {
            var fd1 = new FlightDate("2018-01-01", "2018-01-31");
            var fd2 = new FlightDate("2018-01-31", "2018-03-31");
            assert.equal(fd1.isAdjacentWith(fd2), false);
            assert.equal(fd2.isAdjacentWith(fd1), false);
        });
        it ('should return false when two are separted', function() {
            var fd1 = new FlightDate("2018-01-01", "2018-01-31");
            var fd2 = new FlightDate("2017-01-31", "2017-03-31");
            assert.equal(fd1.isAdjacentWith(fd2), false);
            assert.equal(fd2.isAdjacentWith(fd1), false);
        });
    });
    describe('sort()', function() {
        it ('should return a sorted array', function() {
            var fd1 = new FlightDate("2018-01-01", "2018-01-31");
            var fd2 = new FlightDate("2018-02-01", "2018-03-31");
            var fd3 = new FlightDate("2018-02-01", "2018-05-31");
            var fd4 = new FlightDate("2017-02-01", "2019-03-31");
            var fd5 = new FlightDate("2017-02-01", "2017-03-31");
            var fds = [fd1, fd2, fd3, fd4, fd5];
            FlightDate.sort(fds);
            assert.equal(fds[0].theSame(fd5), true);
            assert.equal(fds[1].theSame(fd4), true);
            assert.equal(fds[2].theSame(fd1), true);
            assert.equal(fds[3].theSame(fd2), true);
            assert.equal(fds[4].theSame(fd3), true);

            fds = [fd5, fd4, fd3, fd2, fd1];
            FlightDate.sort(fds);
            assert.equal(fds[0].theSame(fd5), true);
            assert.equal(fds[1].theSame(fd4), true);
            assert.equal(fds[2].theSame(fd1), true);
            assert.equal(fds[3].theSame(fd2), true);
            assert.equal(fds[4].theSame(fd3), true);
        })
    });
});

