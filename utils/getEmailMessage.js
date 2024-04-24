module.exports = function getEmailMessage(request) {
    let output = `
    <h3>LILIS:New Sign Up for Tattooing</h3>
    <ul>
      <li>Name: ${request.body.firstName} ${request.body.lastName} </li>
      <li>Email: ${request.body.email} </li>
      <li>Phone: ${request.body.telephone} </li>
      <li>Instagram nickname: ${request.body.instagramNikname} </li>
      <li>${request.body.firstName} birthday: ${request.body.birthDate} </li>
      <li>${request.body.firstName} location: ${request.body.location}</li>
      <li>Description of what ${request.body.firstName} want: ${request.body.message}</li>
      <li>Tattoo size: ${request.body.TattooSize}</li>
      <li>Placement on body: ${request.body.Placement}</li>
      <li>Preferred skin tone: ${request.body.skinTone}</li>
      <li>Preferred tattoo color: ${request.body.tatooColor}</li>
      <li>${request.body.firstName} availability: ${request.body.availability}</li>
      <li>Other inquiries: ${request.body.otherInquires}</li>
      <li>Contraindications: ${request.body.Contraindications}</li>
      <li>BestDays: ${request.body.BestDays}</li>
      <li>otherInquires: ${request.body.otherInquires}</li>
      <li>Limit budget: ${request.body.budget}</li>
      <li>Person is over 18: ${request.body.age}</li>
      <li>Will check Spam folder: ${request.body.checkSpam}</li>
    </ul>
    `;
    return output;
}