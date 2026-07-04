
(function(){
    function filterParams() {
        var fp = new URLSearchParams();
        new URLSearchParams(window.location.search).forEach(function(v,k){
            if (!/^e-page-/.test(k)) fp.set(k,v);
        });
        return fp;
    }

    function fixPagination(root) {
        var fp = filterParams();
        if (!fp.toString()) return;
        (root || document).querySelectorAll('.elementor-pagination a').forEach(function(a) {
            try {
                var u = new URL(a.href);
                fp.forEach(function(v,k){ u.searchParams.set(k,v); });
                a.href = u.toString();
            } catch(e) {}
        });
    }

    window.bsFixPagination = fixPagination;

    document.addEventListener('DOMContentLoaded', function(){
        fixPagination(null);
        document.querySelectorAll('.elementor-loop-container').forEach(function(grid) {
            new MutationObserver(function(){ fixPagination(grid.parentElement || grid); })
                .observe(grid, {childList:true, subtree:false});
        });
    });
})();
