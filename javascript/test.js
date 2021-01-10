$(document).ready(function()
{
	
	x = 'men basa dusurem [salam] siz (necesiz) necesiz [salam]';


	y = regulation(x);

	alert(y);

	
	function regulation(s)
	{
		k = -1;
		s_array = s.split('');
		z = s_array.length;

		regularFind 	= s.indexOf("(");
		regularFindx 	= s.indexOf(")");

		for (var i = 0; i < s_array.length; i++) {

			if(s_array[i] == "(" || s_array[i] == "[")
			{
				k = i;
				s_array[i] = '';
				z = s_array.length;
			}

			if(s_array[i] == ")" || s_array[i] == "]")
			{
				z = i;
				s_array[i] = '';
			}			

			if(i>=k && k>0 && i<z)
			{
				s_array[i] = '';
			}

			/*if(i >= regularFind && i <= regularFindx)
			{
				s_array[i] = '';
			}*/
		}

		str = s_array.join('');
	    
	 	return str;
			
		/*if(regularFind == -1)
		{
			return s;
		}
		else
		{
			return s.substr(0, regularFind);
			
		}*/
	}

});