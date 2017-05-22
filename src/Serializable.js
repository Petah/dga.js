Serializable = function($className) {
//    console.log($className);
    this.$className = $className;
};

Serializable.prototype.serializeVariable = function(variable, key) {
    if (_.isFunction(variable)) {
//        console.log('serializeVariable function', key);
        return undefined;
    } else if (_.isArray(variable)) {
//        console.log('serializeVariable array', key);
        return this.serializeArray(variable);
    } else if (_.isObject(variable)) {
//        console.log('serializeVariable object', key);
        if (variable.$className) {
            return this.serializeClass(variable);
        }
        return this.serializeObject(variable);
    }
//    console.log('serializeVariable', typeof variable, key, variable);
    return variable;
};

Serializable.prototype.serializeArray = function(array) {
//    console.log('serializeArray', array.length);
    var result = [];
    for (var i = 0, l = array.length; i < l; i++) {
        result[i] = this.serializeVariable(array[i], i);
    }
    return result;
};

Serializable.prototype.serializeObject = function(object) {
//    console.log('serializeObject', typeof object);
    var properties = {};
    for (var key in this) {
        var variable = this.serializeVariable(this[key], key);
        if (typeof variable !== 'undefined') {
            properties[key] = variable;
        }
        break;
    }
    return properties;
};

Serializable.prototype.serializeClass = function(object) {
//    console.log('serializeClass', object.$className);
    var properties = {};
    for (var key in object) {
//        console.log(key);
        var variable = object.serializeVariable(object[key], key);
        if (typeof variable !== 'undefined') {
            properties[key] = variable;
        }
    }
    return properties;
};

Serializable.prototype.serialize = function() {
    return this.serializeClass(this);
};

Serializable.deserializeVariable = function(variable) {
    if (_.isArray(variable)) {
        return this.deserializeArray(variable);
    } else if (_.isObject(variable)) {
        if (variable.$className) {
            return this.deserializeClass(variable);
        }
    }
    return variable;
};

Serializable.deserializeArray = function(array) {
    var result = [];
    for (var i = 0, l = array.length; i < l; i++) {
        result[i] = Serializable.deserializeVariable(array[i], i);
    }
    return result;
};

Serializable.deserializeClass = function(object) {
    var result = {};
    for (var key in object) {
        result[key] = Serializable.deserializeVariable(object[key]);
        if (key === '$className') {
            result.__proto__ = global[object[key]].prototype;
        }
    }
    return result;
};

Serializable.deserialize = function(object) {
    return Serializable.deserializeClass(object);
};
