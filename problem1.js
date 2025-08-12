// Recursive solution
// O(n) for time complexity
var sum_to_n_a = function (n) {
    if (n <= 1) return n;
    return n + sum_to_n_a(n - 1);
}


// Mathematical formulation
// O(1) for both time complexity and space complexity
var sum_to_n_b = function (n) {
    return (n * (n + 1)) / 2
}

// Basic solution
// O(n) for time complexity
var sum_to_n_c = function (n) {
    let s = 0;
    for (var i = 1; i <= n; i++) {
        s += i;
    };
    return s
}

console.log(sum_to_n_a(10))
console.log(sum_to_n_b(10))
console.log(sum_to_n_c(10))
