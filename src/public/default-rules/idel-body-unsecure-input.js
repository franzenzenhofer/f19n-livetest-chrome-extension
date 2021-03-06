function(page,done)
{
	let that=this;
	let p = page.getLocation('idle').protocol;

	if(p!=='http:'){ done();return; }
	let dom = page.getIdleDom();
	let selector = 'input,textarea';
	let inputs = dom.querySelectorAll(selector);
	if(inputs.length>0)
	{
		let text =  "Unsecure http:// connection (not http<b>s</b>://) with user data elements."+that.partialCodeLink(inputs)+that.highlightLink(selector);
		let type = 'warning';
		let what = 'idle';
		done(that.createResult('BODY', text, type, what)); return;
	}
	done();return;
}
