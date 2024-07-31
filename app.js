fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const services = data.data.services;
        let output = '';

        services.forEach(service => {
            let subServicesOutput = '';
            service.subServices.forEach(subService => {
                subServicesOutput += `<p>${subService.title_en}</p>
                <hr>`;
            });

            output += `
                <div class="service">
                    <div class="serviceMain">
                        <img src="${service.cover_img.publicUrl}" class="serviceImg">
                        <div class="serviceInfo">
                            <p class="serviceName">${service.title_en}</p>
                            <p class="cost"><img src="images/money.png"> Starts from 20$/h</p>
                        </div>
                    </div>
                    <div class="subServices">
                        ${subServicesOutput}
                        
                    </div>
                </div>
            `;
        });

        document.querySelector('.services').innerHTML = output;
    })
    
