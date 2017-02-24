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

        submit: function (data) {
            mbvalidator.resetError($.fn.mbvalidator.defaults.errorClass);
            var resultSet = [];
            $.each(data.data.fe.fe_req, function(k, e) {
                if(!mbvalidator.required(e)){
                    resultSet.push(e);
                }
            });

            $.each(resultSet, function(k, e) {
                mbvalidator.setError(e, 'This is required field.')
            });

            if(resultSet.length > 0){
                return false;
            }
        },

        setError: function(e, message) {
            if($.fn.mbvalidator.defaults.errorBinding){
                var e_class = 'class = "'+$.fn.mbvalidator.defaults.errorClass+'"';
                $(e).after('<'+$.fn.mbvalidator.defaults.errorBinding+' '+e_class+' >'+message+'</'+$.fn.mbvalidator.defaults.errorBinding+'>');
            }else{
                $(e).after(message);
            }

        },

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
        var f           = $(this);
        var fe_req      = [];
        var fe_email    = [];

        mbvalidator.setDefaults(options);

        if(rules.required.length > 0){
            $.each( rules.required, function(k, rule) {
                if(f.find('[name="'+rule+'"]').length > 0){
                    fe_req.push(f.find('[name="'+rule+'"]'));
                }
            });
        }

        $(this).unbind('submit').bind("submit", {
            f: f,
            fe:{
                fe_req: fe_req,
            },
        }, mbvalidator.submit );

    };

    $.fn.mbvalidator.defaults = {
        errorBinding : 'div',
        errorClass   : 'error',
    };

    //$.fn.mbvalidator
    //$.mbvalidator.init();

})(jQuery);