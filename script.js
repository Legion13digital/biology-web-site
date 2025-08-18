 
 function highlightText(text) {
    
    const highlightedElements = document.querySelectorAll('.highlight');
    highlightedElements.forEach(el => {
        const parent = el.parentNode;
        parent.replaceChild(document.createTextNode(el.textContent), el);
        parent.normalize();
    });
    
    
    if (!text) return;
    
    
    const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );
    
    const nodes = [];
    let node;
    while (node = walker.nextNode()) {
        if (node.nodeValue.includes(text)) {
            nodes.push(node);
        }
    }
    
    
    nodes.forEach(node => {
        const parent = node.parentNode;
        const html = node.nodeValue.replace(
            new RegExp(text, 'gi'),
            match => `<span class="highlight">${match}</span>`
        );
        
        const wrapper = document.createElement('span');
        wrapper.innerHTML = html;
        parent.replaceChild(wrapper, node);
    });
}


document.getElementById('searchInput').addEventListener('input', function() {
    highlightText(this.value);
});


document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const searchTerm = document.getElementById('searchInput').value;
    if (searchTerm) {
        
        window.location.href = `https://www.google.com/search?q=${encodeURIComponent(searchTerm + ' biology')}`;
    }
});


const now = new Date();
const options = { year: 'numeric', month: 'long', day: 'numeric' };
document.getElementById('currentDate').textContent = now.toLocaleDateString('en-US', options);
