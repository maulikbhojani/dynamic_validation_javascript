/**
 * Created by Maulik Bhojani on 24/2/17.
 */
/**
 * f = form
 * fe = form elements
 */

;(function($) {
    var mbvalidator = {
        required: function(e) {
            var d = $(e).val().trim();
            if(!d){ return false; }else{ return true; }
        },

        emailValidation: function(e) {
            var d = $(e).val().trim();
            if(!d){ return true; }
            var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return regex.test(d);
        },

        numberValidation: function (e) { //Nuber value
            return $.isNumeric(e);
        },

        submit: function (data) {
            mbvalidator.resetError($.fn.mbvalidator.defaults.errorClass);
            var resultSet = {};
            $.each(data.data.fe, function(k, e) {
                if(e.type == 'required'){
                    if(!mbvalidator.required(e.eobj)){
                        resultSet[e.name] = {'el': e.eobj, 'msg':'This is required field.'};
                    }
                }else if(e.type == 'email'){
                    if(!mbvalidator.emailValidation(e.eobj)){
                        //console.log("result: "+mbvalidator.checkErrorSet(resultSet, e.name));
                        if (typeof resultSet[e.name] === 'undefined') {
                            resultSet[e.name] = {'el': e.eobj, 'msg':'This is email field.'};
                        }
                    }
                }
            });

            $.each(resultSet, function(k, e) {
                mbvalidator.setError(e.el, e.msg)
            });

            return $.isEmptyObject(resultSet);
        },

        setError: function(e, message) {
            if($.fn.mbvalidator.defaults.errorBinding){
                var e_class = 'class = "'+$.fn.mbvalidator.defaults.errorClass+'"';
                $(e).after('<'+$.fn.mbvalidator.defaults.errorBinding+' '+e_class+' >'+message+'</'+$.fn.mbvalidator.defaults.errorBinding+'>');
            }else{
                $(e).after(message);
            }

        },

        /*
        checkErrorSet: function (resultSet, el) {
            console.log(resultSet);
            console.log(el);
            $.each(resultSet, function(k, v) {
                console.log(v.name);
                if(v.name == el){
                    return true;
                }
            });
        }, */

        resetError:  function(c_name){
            $('.'+c_name).remove();
        },

        setDefaults: function(options){
            $.each(options, function(k, v) {
                if(k in $.fn.mbvalidator.defaults){
                    if(k == 'errorClass' || k == 'errorBinding'){ //Can't be blank
                        if(v.trim()){
                            $.fn.mbvalidator.defaults[k] = v;
                        }
                    }else{
                        $.fn.mbvalidator.defaults[k] = v;
                    }

                }
            });
        },
    };

    // Public function
    $.fn.mbvalidator = function(rules, options) {
        var f   = $(this);
        var fe  = [];
        mbvalidator.setDefaults(options);

        if(rules.required.length > 0){
            $.each( rules.required, function(k, name) {
                if(f.find('[name="'+name+'"]').length > 0){
                    fe.push({
                        'name':name,
                        'eobj':f.find('[name="' + name + '"]'),
                        'type':'required',

                    });
                }
            });

            $.each( rules.email, function(k, name) {
                if(f.find('[name="'+name+'"]').length > 0){
                    fe.push({
                        'name':name,
                        'eobj':f.find('[name="' + name + '"]'),
                        'type':'email',

                    });
                }
            });
        }

        $(this).off('submit').on("submit", {
            f: f,
            fe:fe,
        }, mbvalidator.submit );

    };

    $.fn.mbvalidator.defaults = {
        errorBinding : 'div',
        errorClass   : 'error',
    };

    //$.fn.mbvalidator
    //$.mbvalidator.init();

})(jQuery);