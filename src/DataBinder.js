DataBinder = function (template, root) {
    this.template = template;
    this.root = root;

    this.timer = new Interval(this.update.bind(this), 300);
};

DataBinder.prototype.update = function () {
    var templates = document.querySelectorAll(this.template);
    for (var i = 0; i < templates.length; i++) {
        this.updateBindings(templates[i].querySelectorAll('[data-bind]'));
    }
};

DataBinder.prototype.updateBindings = function (bindings) {
    for (var i = 0; i < bindings.length; i++) {
        var data = this.getData(bindings[i].dataset.bind);
        bindings[i].innerText = data;
    }
};

DataBinder.prototype.getData = function (key) {
    var parts = key.split('.'),
            current = this.root;
    for (var i = 0; i < parts.length; i++) {
        current = current[parts[i]];
    }
    return current;
};
