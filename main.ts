radio.onReceivedNumber(function (receivedNumber) {
    basic.showString("" + convertToText(receivedNumber) + " cm")
})
input.onButtonPressed(Button.A, function () {
    if (mode == 0) {
        group += -1
        if (group < 0) {
            group = 5
        }
        basic.showNumber(group)
    } else if (mode >= 2) {
        mode += -1
        if (mode < 2) {
            mode = 5
        }
        scherm()
    }
})
input.onButtonPressed(Button.AB, function () {
    if (mode == 0) {
        mode = 1
        radio.setGroup(group)
        basic.showLeds(`
            . . . . .
            . . . . #
            . . . # .
            # . # . .
            . # . . .
            `)
        basic.pause(200)
        basic.showLeds(`
            . # # # .
            # . . . #
            # # # # #
            # . # . #
            . # # # .
            `)
    } else if (mode == 1) {
        mode = 2
        scherm()
        radio.sendValue("stop", 0)
    } else if (mode == 2) {
        mode = 0
        basic.showNumber(group)
    } else if (mode == 3) {
        radio.sendValue("lampen", 1)
        mode = 1
        basic.showLeds(`
            . # # # .
            # . . . #
            # # # # #
            # . # . #
            . # # # .
            `)
    } else if (mode == 4) {
        mode = 1
        basic.showLeds(`
            . # # # .
            # . . . #
            # # # # #
            # . # . #
            . # # # .
            `)
    } else if (mode == 5) {
        radio.sendValue("sonar", 0)
    }
})
// preview plaatjes voor de verschillende modussus
function scherm () {
    if (mode == 2) {
        basic.showLeds(`
            # . . . .
            . # . . .
            # # # # .
            # # # # .
            # # # # .
            `)
    } else if (mode == 3) {
        basic.showLeds(`
            . . . . .
            . # # # .
            # # # # .
            . # # # .
            . . . . .
            `)
    } else if (mode == 4) {
        basic.showLeds(`
            . . # . .
            . # . . .
            # # # # .
            . # . . #
            . . # . #
            `)
    } else if (mode == 5) {
        basic.showLeds(`
            # . . . #
            # # # # #
            # . # . #
            # # # # #
            . # # # .
            `)
    } else {
    	
    }
}
input.onButtonPressed(Button.B, function () {
    if (mode == 0) {
        group += 1
        if (group > 5) {
            group = 0
        }
        basic.showNumber(group)
    } else if (mode >= 2) {
        mode += 1
        if (mode > 5) {
            mode = 2
        }
        scherm()
    }
})
let speed = 0
let ofset = 0
let group = 0
let mode = 0
mode = 0
group = 0
basic.showNumber(0)
basic.forever(function () {
    while (mode == 1) {
        if (input.buttonIsPressed(Button.A)) {
            // ofset voor de tilt van de mictobit
            ofset = input.rotation(Rotation.Pitch)
            // kijkt naar de kantel waarde van de microbit en verzend het dan naar de catcar. zolang de a knop blijft ingedrukt
            while (input.buttonIsPressed(Button.A)) {
                speed = input.rotation(Rotation.Pitch) - ofset
                if (speed < 0) {
                    radio.sendValue("rijden", Math.abs(speed))
                } else {
                    radio.sendValue("back", speed)
                }
                basic.pause(15)
            }
            basic.pause(15)
            radio.sendValue("stop", 0)
        }
        if (input.buttonIsPressed(Button.B)) {
            while (input.buttonIsPressed(Button.B)) {
                speed = input.rotation(Rotation.Roll)
                if (speed < 0) {
                    radio.sendValue("links", Math.abs(speed))
                } else {
                    radio.sendValue("rechts", speed)
                }
                basic.pause(15)
            }
            basic.pause(15)
            radio.sendValue("stop", 0)
        }
        basic.pause(25)
    }
    basic.pause(250)
})
