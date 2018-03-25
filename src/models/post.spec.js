const { expect } = require('chai');
const sinon = require('sinon');
const Post = require('./post');

describe('Post Model', () => {
    it('should export a model', () => {
        expect(Post).to.be.a('function');
    });

    it('should accept title property', () => {
        const p = new Post({
            title: 'test title'
        });

        expect(p.title).to.equal('test title');
    });

    it('should accept body property', () => {
        const p = new Post({
            body: 'test body'
        });

        expect(p.body).to.equal('test body');
    });

    it('should not accept unknown property', () => {
        const p = new Post({
            notaproperty: '123'
        });

        expect(p.notaproperty).to.be.undefined;
    });

    it('should have a creationDate', () => {
        const p = new Post();
        expect(p.creationDate).to.be.instanceOf(Date);
    });

    it('should have set creationDate to now', () => {
        const dateStub = sinon.spy(Date, 'now');

        new Post();
        expect(dateStub.calledOnce).to.equal(true);
    });

    describe('validation', () => {
        it('should be invalid if there is no title', done => {
            const p = new Post();

            p.validate(err => {
                expect(err).to.be.instanceOf(Error);
                expect(err.errors.title).to.exist;
                done();
            });
        });

        it('should be invalid if there is no body', done => {
            const p = new Post();

            p.validate(err => {
                expect(err).to.be.instanceof(Error);
                expect(err.errors.body).to.exist;
                done();
            });
        });
    });
});
