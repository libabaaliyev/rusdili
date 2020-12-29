$(document).ready(function()
{
	f = [];
	for (var i = 1; i < 30; i++) {
		x = {'year':2020,'month':12,'day': i}
		f.push(x);
		localStorage.day_use = JSON.stringify(f);
	}
});