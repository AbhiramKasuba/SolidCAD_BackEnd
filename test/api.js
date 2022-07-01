
var expect = require('chai').expect;
const chai = require('chai');
const http = require('chai-http');
var faker = require('faker');

chai.use(http);
const app = require('../server');

// before(function(){
//     app.listen(1002,()=>{
//         console.log("Started listening on 1002")
//     })
// })




describe('Create New  Enquiry Form', function () {
  this.timeout(20000);
  it('With Valid Data', async () => {
    let payload = {
      "firstName": faker.name.firstName(),
      "lastName": faker.name.lastName(),
      "email": faker.internet.email(),
      "message": "Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. Donec odio"
    }
    console.log("payload", payload)
    await chai.request(app)
      .post('/api/v1/contactUs')
      .send(payload)
      .then((res, err) => {
        if (err) {
          console.log(err)
          // assert(err);

        } else {
          expect(res.body.success).to.eq(true);
          //   expect(res.body.response).to.not.eq(null);
        }
      })
  })
  it('With InValid firstName Data Exceed the limit', async () => {
    let payload = {
      "firstName": faker.name.firstName()+"skdjjksdjkdsjkjskdkldslkdsklkl",
      "lastName": faker.name.lastName(),
      "email": faker.internet.email(),
      "message": "Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. Donec odio"

    }
    console.log("payload", payload)
    await chai.request(app)
      .post('/api/v1/contactUs')
      .send(payload)
      .then((res, err) => {
        if (err) {
          console.log(err)
          // assert(err);

        } else {
          expect(res.body.success).to.eq(false);
          //   expect(res.body.response).to.not.eq(null);
        }
      })
  })

  it('With InValid LastName Data Exceed the limit', async () => {
    let payload = {
      "firstName": faker.name.firstName(),
      "lastName": faker.name.lastName()+"skdjjksdjkdsjkjskdkldslkdsklkl",
      "email": faker.internet.email(),
      "message": "Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. Donec odio"
    }
    console.log("payload", payload)
    await chai.request(app)
      .post('/api/v1/contactUs')
      .send(payload)
      .then((res, err) => {
        if (err) {
          console.log(err)
          // assert(err);

        } else {
          expect(res.body.success).to.eq(false);
          //   expect(res.body.response).to.not.eq(null);
        }
      })
  })

  it('With InValid Email Data Exceed the limit', async () => {
    let payload = {
      "firstName": faker.name.firstName(),
      "lastName": faker.name.lastName(),
      "email":"skdjjksdjkdsjkjskdkldslkdsklklsdklsdlkklsdlkjksdjksd"+faker.internet.email(),
      "message": "Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. Donec odio"

    }
    console.log("payload", payload)
    await chai.request(app)
      .post('/api/v1/contactUs')
      .send(payload)
      .then((res, err) => {
        if (err) {
          console.log(err)
          // assert(err);

        } else {
          expect(res.body.success).to.eq(false);
          //   expect(res.body.response).to.not.eq(null);
        }
      })
  })

  it('With InValid Message Data Exceed the limit', async () => {
    let payload = {
      "firstName": faker.name.firstName(),
      "lastName": faker.name.lastName(),
      "email": faker.internet.email(),
      "message": "Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. Donec odio urna, tempus molestie, porttitor ut, iaculis quis, sem. Phasellus rhoncus. Aenean id metus id velit ullamcorper pulvinar. Vestibulum fermentum tortor id mi. Pellentesque ipsum. Nulla non arcu lacinia neque faucibus fringilla. Nulla non lectus sed nisl molestie malesuada. Proin in tellus sit amet nibh dignissim sagittis. Vivamus luctus egestas leo. Maecenas sollicitudin. Nullam rhoncus aliquam metus. Etiam egestas wisi a erat.Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Nullam feu"
    }
    console.log("payload", payload)
    await chai.request(app)
      .post('/api/v1/contactUs')
      .send(payload)
      .then((res, err) => {
        if (err) {
          console.log(err)
          // assert(err);

        } else {
          expect(res.body.success).to.eq(false);
          //   expect(res.body.response).to.not.eq(null);
        }
      })
  })

  it('With InValid Request Add Unknow Parameter(caseId) in Request', async () => {
    let payload = {
      "firstName": faker.name.firstName(),
      "lastName": faker.name.lastName(),
      "email": faker.internet.email(),
      "message": "Nam quis nulla. Integer malesuada. In in enim a arcu imperdiet malesuada. Sed vel lectus. Donec odio",
      "caseId": "ICI8392982389328998"
    }
    console.log("payload", payload)
    await chai.request(app)
      .post('/api/v1/contactUs')
      .send(payload)
      .then((res, err) => {
        if (err) {
          console.log(err)
          // assert(err);

        } else {
          expect(res.body.success).to.eq(false);
          //   expect(res.body.response).to.not.eq(null);
        }
      })
  })
})



