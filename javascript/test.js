$(document).ready(function()
{
	for (var i = 0; i < 20; i++) {

		if(i<5)
			kMax = 6;
		else if(i<10)
			kMax = 9;
		else
			kMax = 12;
		
		for (var k = 1; k < kMax; k++) {
			
			sMax = k+1;
			if(sMax<3)
				sMax = 3;
			else if(sMax>5)
				sMax = 4;

			for (var s = 0; s < sMax; s++) {
				
			
				min = selectQue('min',i,k,s);
				max = selectQue('max',i,k,s);
				x =`<p>Grade:`+i+`; Step:`+k+`; Exam: `+s+`;  Min: `+min+`; Max:`+max+`</p><br>`;
				$(x).appendTo("#demo");
			}

		}
	}



	function selectQue(e,g,s,ex)
	{
		cQuestions = 7;

		xMin = cQuestions*(g*16 + (s-1)*3 + ex);
		xMax = xMin+cQuestions;
		
		if(xMax > 10500){
			xMax = 1099;
			xMin = 1080;
		}
		
		
		if(e=="min")
			return xMin;
		else
			return xMax;
	}

});