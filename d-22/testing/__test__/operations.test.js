const { it, expect } = require('@jest/globals')
const { addition, subtraction, division, multiplication} = require('../../functions')

describe('Testing Addition', ()=> {
    it('Should return 56', ()=> {
        const value = addition(42,14)
        expect(value).toBe(56)
    })
    it('Should return -36', ()=> {
        const value = addition(89,-125)
        expect(value).toBe(-36)
    })
    it('Should return Input must be a number', ()=> {
        const value = addition('42','prueba')
        expect(value).toBe('Input must be a number')
    })
    it('Should return Must enter at least two digits', ()=> {
        const value = addition(25)
        expect(value).toBe('Must enter at least two digits')
    })
    it('Should return Must enter at least two digits', ()=> {
        const value = addition()
        expect(value).toBe('Must enter at least two digits')
    })
    it('Should return Input must be a number', ()=> {
        const value = addition(null,null)
        expect(value).toBe('Input must be a number')
    })
})

describe('Testing Substraction', ()=> {
    it('Should return -913', ()=> {
        const value = subtraction(50,963)
        expect(value).toBe(-913)
    })
    it('Should return 15', ()=> {
        const value = subtraction(25,10)
        expect(value).toBe(15)
    })
    it('Should return Input must be a number', ()=> {
        const value = subtraction('','prueba')
        expect(value).toBe('Input must be a number')
    })
    it('Should return Must enter at least two digits', ()=> {
        const value = subtraction(1)
        expect(value).toBe('Must enter at least two digits')
    })
    it('Should return Must enter at least two digits', ()=> {
        const value = subtraction()
        expect(value).toBe('Must enter at least two digits')
    })
    it('Should return Input must be a number', ()=> {
        const value = subtraction(null,undefined)
        expect(value).toBe('Input must be a number')
    })
})

describe('Testing Multiplication', ()=> {
    it('Should return 100', ()=> {
        const value = multiplication(10,10)
        expect(value).toBe(100)
    })
    it('Should return -1450', ()=> {
        const value = multiplication(-25,58)
        expect(value).toBe(-1450)
    })
    it('Should return Input must be a number', ()=> {
        const value = multiplication('prueba', 90)
        expect(value).toBe('Input must be a number')
    })
    it('Should return Must enter at least two digits', ()=> {
        const value = multiplication(2)
        expect(value).toBe('Must enter at least two digits')
    })
    it('Should return Must enter at least two digits', ()=> {
        const value = multiplication()
        expect(value).toBe('Must enter at least two digits')
    })
    it('Should return Input must be a number', ()=> {
        const value = multiplication(null,undefined)
        expect(value).toBe('Input must be a number')
    })
})

describe('Testing Division', ()=> {
    it('Should return 11.818181818181818', ()=> {
        const value = division(130,11)
        expect(value).toBe(11.818181818181818)
    })
    it('Should return -12.5', ()=> {
        const value = division(-25,2)
        expect(value).toBe(-12.5)
    })
    it('Should return Input must be a number', ()=> {
        const value = division('', 90)
        expect(value).toBe('Input must be a number')
    })
    it('Should return Must enter at least two digits', ()=> {
        const value = division(7)
        expect(value).toBe('Must enter at least two digits')
    })
    it('Should return Must enter at least two digits', ()=> {
        const value = division()
        expect(value).toBe('Must enter at least two digits')
    })
    it("Should return Can't divide by 0", ()=> {
        const value = division(178,0)
        expect(value).toBe("Can't divide by 0")
    })
    it("Should return Can't divide by 0", ()=> {
        const value = division(0,90)
        expect(value).toBe("Can't divide by 0")
    })
})