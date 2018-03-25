const { expect } = require('chai');
const sinon = require('sinon');
const httpMocks = require('node-mocks-http');
const rewire = require('rewire');

const create = rewire('./create');

describe('Post - Create', () => {
    let request;
    let response;
    let nextStub;

    beforeEach(() => {
        request = httpMocks.createRequest();
        response = httpMocks.createResponse();
        nextStub = sinon.stub();
    });

    describe('GET', () => {
        it('should render form', () => {
            const renderSpy = sinon.spy(response, 'render');
            create.get(request, response, nextStub);

            expect(response.statusCode).to.equal(200);
            expect(renderSpy.calledOnce).to.be.true;
            expect(renderSpy.calledWithExactly('create')).to.be.true;
            expect(nextStub.called).to.be.false;
        });
        // it('should render form', done => {
        //     request(router)
        //         .get('/posts/create')
        //         .end((err, res) => {
        //             expect(err).to.be.null;
        //             expect(res.status).to.equal(200);
        //             done();
        //         });
        // });
    });

    describe('POST', () => {
        let saveStub;

        beforeEach(() => {
            class MockPost {
                save() {}
            }
            saveStub = sinon.stub(MockPost.prototype, 'save').resolves({
                id: 123
            });
            create.__set__('Post', MockPost);
        });

        afterEach(() => {
            saveStub.restore();
        });
        it('should create post', () => {
            return create.post(request, response, nextStub).then(() => {
                expect(saveStub.calledOnce).to.be.true;
                expect(saveStub.calledWithExactly()).to.be.true;
                expect(nextStub.called).to.be.false;
            });
        });

        it('should redirect to post', () => {
            return create.post(request, response, nextStub).then(() => {
                expect(response.statusCode).to.equal(302);
                expect(response._getRedirectUrl()).to.equal(123);
            });
        });

        it('should send 500 status on error', () => {
            const err = new Error('TestError');
            saveStub.rejects(err);
            return create.post(request, response, nextStub).then(() => {
                expect(response.statusCode).to.equal(500);
                expect(nextStub.calledOnce).to.be.true;
                expect(nextStub.calledWithExactly(err)).to.be.true;
            });
        });
    });
});
