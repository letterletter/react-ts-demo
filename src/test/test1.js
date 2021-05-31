"use strict";
exports.__esModule = true;
var Student = /** @class */ (function () {
    function Student(XH, name, clazz) {
        this.XH = XH;
        this.name = name;
        this.clazz = clazz;
    }
    return Student;
}());
var Teacher = /** @class */ (function () {
    function Teacher(GH, name) {
        this.GH = GH;
        this.name = name;
    }
    return Teacher;
}());
var GenericDAO = /** @class */ (function () {
    function GenericDAO() {
    }
    GenericDAO.prototype.save = function (arg) {
        var ret = false;
        try {
            console.log('save to db');
            console.log(arg);
            //save(arg)
            ret = true;
        }
        catch (_a) {
            ret = false;
        }
        return ret;
    };
    return GenericDAO;
}());
var student = new Student('0101', 'jack', 'cla--22');
var teacher = new Teacher('T001', 'Smitch');
var geDao = new GenericDAO();
var ret = geDao.save(student);
var geDao2 = new GenericDAO();
var ret2 = geDao2.save(teacher);
console.log(ret, ret2, 'eee');
