module.exports =  function getTgMessade(emailSent) {
    const tgMessage = `
    Email sent successfully:
    *Name:* ${emailSent.profile.firstName} ${emailSent.profile.lastName}
    *Email:* ${emailSent.profile.email}
    *Telephone:* ${emailSent.profile.telephone}
    *Instagram Nickname:* ${emailSent.profile.instagramNikname}
    *Birth Date:* ${emailSent.profile.birthDate}
    *Location:* ${emailSent.profile.location}
    *Tattoo Size:* ${emailSent.profile.TattooSize}
    *Placement:* ${emailSent.profile.Placement}
    *Skin Tone:* ${emailSent.profile.skinTone}
    *Message:* ${emailSent.profile.message}
    *Tattoo Color:* ${emailSent.profile.tatooColor}
    *Availability:* ${emailSent.profile.availability}
    *Contraindications:* ${emailSent.profile.Contraindications}
    *Best Days:* ${emailSent.profile.BestDays}
    *Other Inquiries:* ${emailSent.profile.otherInquires}
    *Budget:* ${emailSent.profile.budget}
    *Age:* ${emailSent.profile.age}
    *Check Spam Folder:* ${emailSent.profile.checkSpam}
  `;
    return tgMessage.replace('`', '')
    // подивитись які символи телеграм не приймає
  }