
'use strict';

var home = function()
{
	var isLocked = true;

  return {

    DEBUG: false,
    init: function()
    {
      console.log('Init home...');
    },
    update: function()
    {
    	//
    },
		toggleLock()
		{
			console.log("Toggling lock...");
			this.isLocked = !this.isLocked;
			console.log("Lock is: " + this.isLocked);
		}
  };

}();
