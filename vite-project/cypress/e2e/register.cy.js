describe('Kayıt Formu Testleri', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173/register'); // Kendi URL'inle değiştir
    });

    // a) Başarılı form doldurulduğunda submit edebiliyorum
    it('Başarılı form doldurulduğunda success sayfasını açabiliyorum', () => {
        cy.get('input[name="email"]').type('ali@veli.com');
        cy.get('input[name="password"]').type('Sifre123.');
        cy.get('input[name="terms"]').check();

        cy.get('button').should('not.be.disabled').click();
        
        // Success sayfasına yönlendiğini doğrula
        cy.url().should('include', '/success');
    });

    // b) Hatalı durumlarda beklenen hata mesajları ve buton durumu
    describe('Hatalı Durum Kontrolleri', () => {
        
        it('Email yanlış girildiğinde beklenen kontroller', () => {
            cy.get('input[name="email"]').type('yanlis-email');
            
            // Ekranda SADECE 1 tane GÖRÜNÜR hata mesajı olmalı
            cy.get('.invalid-feedback').filter(':visible').should('have.length', 1);
            
            // Ekranda doğru hata mesajı var mı?
            cy.get('.invalid-feedback').filter(':visible')
              .should('contain', 'Geçerli bir e-mail giriniz');
            
            // Buton disabled durumda mı?
            cy.get('button').should('be.disabled');
        });

        it('Email ve Password yanlış girildiğinde beklenen kontroller', () => {
            cy.get('input[name="email"]').type('yanlis-email');
            cy.get('input[name="password"]').type('123'); // Hatalı kısa şifre

            // Ekranda 2 tane GÖRÜNÜR hata mesajı olmalı
            cy.get('.invalid-feedback').filter(':visible').should('have.length', 2);
            
            // Ekranda password hata mesajı var mı?
            cy.get('.invalid-feedback').filter(':visible')
              .should('contain', 'Şifre en az 8 karakter olmalı');
            
            cy.get('button').should('be.disabled');
        });

        it('Email ve password doğru ama kurallar kabul edilmediğinde buton disabled mı?', () => {
            cy.get('input[name="email"]').type('ali@veli.com');
            cy.get('input[name="password"]').type('Sifre123.');
            
            // terms checkbox'ı işaretlenmedi (default false)
            cy.get('input[name="terms"]').should('not.be.checked');
            
            // Buton disabled mı?
            cy.get('button').should('be.disabled');
        });
    });
});