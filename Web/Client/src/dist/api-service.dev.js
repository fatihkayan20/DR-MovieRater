"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.API = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Token = 'a4729dcd93c7ddb510693ec57fcb299733dc5804';

var API =
/*#__PURE__*/
function () {
  function API() {
    _classCallCheck(this, API);
  }

  _createClass(API, null, [{
    key: "updateMovie",
    value: function updateMovie(mov_id, body) {
      return fetch("http://127.0.0.1:8000/api/movies/".concat(mov_id, "/"), {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': "Token ".concat(Token)
        },
        body: JSON.stringify(body)
      }).then(function (res) {
        return res.json();
      });
    }
  }]);

  return API;
}();

exports.API = API;