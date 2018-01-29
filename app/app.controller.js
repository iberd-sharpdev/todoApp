export default class AppController {
    constructor($mdDialog, $window) {
        "ngInject";
        this.$mdDialog = $mdDialog;
        this.$window = $window;
        this.listName = 'list';
    }

    openMenu(mdOpenMenu, event) {
        mdOpenMenu(event);
    }

    isSupportsLocalStorage() {
        try {
            return 'localStorage' in this.$window && this.$window['localStorage'] !== null;
        } catch (e) {
            return false;
        }
    }


    getStoredList() {
        let storedList = null;
        if (this.isSupportsLocalStorage()) {
            let storedListJson = localStorage[this.listName];
            if (storedListJson) {
                storedList = JSON.parse(storedListJson);
            }
        }

        return storedList;
    }

    saveStoredList() {
        if (this.isSupportsLocalStorage()) {
            localStorage[this.listName] = JSON.stringify(this.data);
        }
    }

    init() {
        let storedList = this.getStoredList();
        if (storedList) {
            this.data = storedList;
        } else {
            this.data = [];
        }
    }

    addTodo(ev) {
        let dialog = this.$mdDialog.prompt()
            .title('Add todo')
            .placeholder('Title...')
            .ariaLabel('Title')
            .targetEvent(ev)
            .ok('OK')
            .cancel('Cancel');

        this.$mdDialog.show(dialog).then(
            (result) => {
                if (!!result) {
                    let newID = 1;
                    if (this.data.length > 0) {
                        let maxIDobject = _.maxBy(this.data, (obj) => { return obj.id });
                        newID = maxIDobject.id + 1;
                    }
                    let item = {
                        id: newID,
                        title: result,
                        checked: false
                    };
                    this.data.push(item);
                    this.saveStoredList();
                }
            },
            () => {}
        );
    }

    toggleSelectAll() {
        _.forEach(this.data, (value) => {
            value.checked = true;
        });
    }

    deleteTodos() {
        _.remove(this.data, (obj) => {
            return obj.checked
        });
        this.saveStoredList();
    }
}