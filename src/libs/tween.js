import TWEEN from '@tweenjs/tween.js'

export const tweenState = function(newState, oldState, callback) {
    var newValue = 0
    var oldValue = 0

    if (oldState === 'idle') {
        oldValue = 0
        newValue = 50
    } else if (oldState === 'loading') {
        oldValue = 50
        newValue = 100
    }

    function animate() {
        if (TWEEN.update()) {
            requestAnimationFrame(animate)
        }
    }

    new TWEEN.Tween({ x: oldValue })
        .easing(TWEEN.Easing.Quadratic.Out)
        .to({ x: newValue }, 500)
        .onUpdate(function(object) {
            callback(object.x.toFixed(0))
        })
        .start()
    animate()
}
