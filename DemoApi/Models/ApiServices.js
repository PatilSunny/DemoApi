

app.service("myprovider", function () {
    this.tokenbase = false;

    // // local host
     this.rbaseUrl = 'http://localhost:61997/';
     this.appserver = 'http://localhost:63785/api/';

    // //  host
    // this.appserver = 'http://192.168.1.2:80/pi/api/';
    // this.reportserver = 'http://192.168.1.2:80/ssrs/';

     

    this.rbaseUrl = this.reportserver;
    this.apiUrl = this.appserver;

});



myapp.service('apiServices', ['$http', '$q', '$rootScope', 'httpLoader', "myprovider", function ($http, $q, $rootScope, httpLoader, myprovider ) {

    this.rpt_url = myprovider.reportserver;
    this.baseurl = myprovider.appserver;
    this.url = myprovider.server;
    this.tokenbaseApi = myprovider.tokenbase; 
     
    this.post = function (url, data, params, headers, beforeSend, complete, ignoreDuplicate) {
        var deferred = $q.defer(),
            ajax = this;

        if (!headers) {
            headers = {};
        }

        if ($().getConstant("at")) {
            headers.at = $().getConstant("at");
        }
         
        url = this.baseurl + url + '/post';

        $http({
            url: url,
            method: "POST",
            data: data,
            params: params,
            headers: headers,
            beforeSend: beforeSend,
            complete: complete,
            rejectDuplicateRequest: true,
            ignoreDuplicateRequest: ignoreDuplicate
        }).then(function (response) {
            var x = response.headers();
            if (x && x.at) {
                $().setConstant("at", x.at);
            }
            deferred.resolve(response.data);
        }, function (error, status) {
            deferred.reject({
                "code": error.status,
                "msg": ajax.geterrorData(error.data)
            });
        })['finally'](function () {
            $().resetAlive();
        });

        deferred.promise.cancel = function () {
            deferred.reject('CANCELLED')
        };

        return deferred.promise;
    };

    this.postbyurl = function (url, data, params, headers, beforeSend, complete, ignoreDuplicate) {
        var deferred = $q.defer(),
            ajax = this;

        if (!headers) {
            headers = {};
        }

        if ($().getConstant("at")) {
            headers.at = $().getConstant("at");
        }
         
        url = this.baseurl + url;

        $http({
            url: url,
            method: "POST",
            data: data,
            params: params,
            headers: headers,
            beforeSend: beforeSend,
            complete: complete,
            rejectDuplicateRequest: true,
            ignoreDuplicateRequest: ignoreDuplicate
        }).then(function (response) {
            var x = response.headers();
            if (x && x.at) {
                $().setConstant("at", x.at);
            }
            deferred.resolve(response.data);
        }, function (error, status) {
            deferred.reject({
                "code": error.status,
                "msg": ajax.geterrorData(error.data)
            });
        })['finally'](function () {
            $().resetAlive();
        });

        deferred.promise.cancel = function () {
            deferred.reject('CANCELLED')
        };

        return deferred.promise;
    };

    this.gets = function (url, data, headers, beforeSend, complete, ignoreDuplicate) {
        var deferred = $q.defer(),
            ajax = this;

        if (!headers) {
            headers = {};
        }

        if ($().getConstant("at")) {
            headers.at = $().getConstant("at");
        }

        $http({
            url: url,
            method: "GET",
            data: data,
            params: data,
            headers: headers,
            beforeSend: beforeSend,
            complete: complete,
            rejectDuplicateRequest: true,
            ignoreDuplicateRequest: ignoreDuplicate
        }).then(function (response) {
            var x = response.headers();
            if (x && x.at) {
                $().setConstant("at", x.at);
            }
            deferred.resolve(response.data);
        }, function (error, status) {
            deferred.reject({
                "code": error.status,
                "msg": ajax.geterrorData(error.data)
            });
            if (ajax.pendingReq() === 0) {
                setTimeout(function () {
                    $rootScope.$emit("errors", {});
                }, 1000);

            }
        })['finally'](function () {
            $().resetAlive();
        });

        deferred.promise.cancel = function () {
            deferred.reject('CANCELLED')
        };
        return deferred.promise;
    };

    this.get = function (url, data, params, headers, beforeSend, complete, ignoreDuplicate, IgnoreLoadingBar) {
        var deferred = $q.defer(),
            ajax = this;

        if (!headers) {
            headers = {};
        }

        if ($().getConstant("at")) {
            headers.at = $().getConstant("at");
        }
         
        url = this.baseurl + url;

        $http({
            url: url,
            method: "GET",
            data: data,
            params: params,
            headers: headers,
            beforeSend: beforeSend,
            complete: complete,
            rejectDuplicateRequest: true,
            ignoreDuplicateRequest: ignoreDuplicate,
            ignoreLoadingBar: IgnoreLoadingBar
        }).then(function (response) {
            var x = response.headers();
            if (x && x.at) {
                $().setConstant("at", x.at);
            }
            deferred.resolve(response.data);
        }, function (error, status) {
            deferred.reject({
                "code": error.status,
                "msg": ajax.geterrorData(error.data)
            });
            if (ajax.pendingReq() === 0) {
                setTimeout(function () {
                    $rootScope.$emit("errors", {});
                }, 1000);

            }
        })['finally'](function () {
            $().resetAlive();
        });

        deferred.promise.cancel = function () {
            deferred.reject('CANCELLED')
        };

        return deferred.promise;
    };

    this.put = function (url, data, params, headers, beforeSend, complete, ignoreDuplicate) {
        var deferred = $q.defer(),
            ajax = this;

        if (!headers) {
            headers = {};
        }

        if ($().getConstant("at")) {
            headers.at = $().getConstant("at");
        }
        url = this.baseurl + url + '/put';
         
        $http({
            url: url,
            method: "PUT",
            data: data,
            params: params,
            headers: headers,
            beforeSend: beforeSend,
            complete: complete,
            rejectDuplicateRequest: true,
            ignoreDuplicateRequest: ignoreDuplicate
        }).then(function (response) {
            var x = response.headers();
            if (x && x.at) {
                $().setConstant("at", x.at);
            }
            deferred.resolve(response.data);
        }, function (error, status) {
            deferred.reject({
                "code": error.status,
                "msg": ajax.geterrorData(error.data)
            });
        })['finally'](function () {
            $().resetAlive();
        });

        deferred.promise.cancel = function () {
            deferred.reject('CANCELLED')
        };

        return deferred.promise;
    };

    this.putbyurl = function (url, data, params, headers, beforeSend, complete, ignoreDuplicate) {
        var deferred = $q.defer(),
            ajax = this;

        if (!headers) {
            headers = {};
        }

        if ($().getConstant("at")) {
            headers.at = $().getConstant("at");
        }

        url = this.baseurl + url;
         
        $http({
            url: url,
            method: "PUT",
            data: data,
            params: params,
            headers: headers,
            beforeSend: beforeSend,
            complete: complete,
            rejectDuplicateRequest: true,
            ignoreDuplicateRequest: ignoreDuplicate
        }).then(function (response) {
            var x = response.headers();
            if (x && x.at) {
                $().setConstant("at", x.at);
            }
            deferred.resolve(response.data);
        }, function (error, status) {
            deferred.reject({
                "code": error.status,
                "msg": ajax.geterrorData(error.data)
            });
        })['finally'](function () {
            $().resetAlive();
        });
        deferred.promise.cancel = function () {
            deferred.reject('CANCELLED')
        };
        return deferred.promise;
    };

    this.delete = function (url, data, params, headers, beforeSend, complete, ignoreDuplicate) {
        var deferred = $q.defer(),
            ajax = this;

        if (!headers) {
            headers = {};
        }

        if ($().getConstant("at")) {
            headers.at = $().getConstant("at");
        }
         
        url = this.baseurl + url + '/Delete';

        $http({
            url: url,
            method: "DELETE",
            data: data,
            params: params,
            headers: headers,
            beforeSend: beforeSend,
            complete: complete,
            rejectDuplicateRequest: true,
            ignoreDuplicateRequest: ignoreDuplicate
        }).then(function (response) {
            var x = response.headers();
            if (x && x.at) {
                $().setConstant("at", x.at);
            }
            deferred.resolve(response.data);
        }, function (error, status) {
            deferred.reject({
                "code": error.status,
                "msg": ajax.geterrorData(error.data)
            });
        })['finally'](function () {
            $().resetAlive();
        });

        deferred.promise.cancel = function () {
            deferred.reject('CANCELLED')
        };

        return deferred.promise;
    };

    this.getrelatives = function (urls, headers, beforeSend, complete, ignoreDuplicate) {
        $(".loading").show();

        var deferred = $q.defer();

        ajax = this;

        var urlCalls = [];

        angular.forEach(urls, function (address) {
            var url = ajax.baseurl + address.url;
            var headers = {};
             
            urlCalls.push(
                $http.get(url, {
                    params: address.params,
                    headers: headers
                })
            );

        });

        // they may, in fact, all be done, but this
        // executes the callbacks in then, once they are
        // completely finished.

        $q.all(urlCalls).then(function (response) {

            deferred.resolve(response);

            $(".loading").hide();
        }, function (error, status) {

            deferred.reject({
                "code": error.status,
                "msg": ajax.geterrorData(error.data)
            });

            $(".loading").hide();
        })

        return deferred.promise;
    };

    this.getErrorMessage = function (code) {
        switch (code) {
            case 400:
                return "Bad Request";
            case 401:
                return "Unauthorized";
            case 403:
                return "Forbidden";
            case 404:
                return "Not Found";
            case 500:
                return "Internal Server Error";
            case -1:
                return "Gateway Timeout";
            default:
                return "";
        }
    };

    this.pendingReq = function () {
        return httpLoader.pending();
    };

    this.geterrorData = function (data) {
        var msg = '';

        if (data) {

            if (data.InnerException) {

                if (data.InnerException.InnerException)
                    msg = data.InnerException.InnerException.ExceptionMessage;
                else
                    msg = data.InnerException.ExceptionMessage;

            }
            else
                msg = data.ExceptionMessage;

        }

        return msg;
    }


}]);
