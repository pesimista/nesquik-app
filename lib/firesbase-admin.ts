import admin from 'firebase-admin'

const prod = {
  credential: admin.credential.cert({
    projectId: 'quick-3909f',
    clientEmail: 'firebase-adminsdk-2n5ht@quick-3909f.iam.gserviceaccount.com',
    privateKey:
      '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDGw7jiPHBXgSdH\nVZTVq2c0o8PgQYb9tVU/rc5srcmE4johYWGdI9PwgWEaphL34UvSbhgAPRl416z3\nnWKHKgeKJp6wovcD8jF4HdeW/ABG2j8JqrF45c3d0lSOstPyCyfOWij2Ov/HOXrx\nRLz4qyoJ0kGyoUdMS730stOVqL54sxggYbPdDokTILfGI4ACcGvhzB/eRD1W8w6X\nq33UlJ1AgjD56WvJJRL9NDkKe8AFVMDzFRHmGQGP3zaNHr8aRQB6FHPTa2S3JATg\nETYXzdrM7jZkpPZ8XyPYHlxbpZei0c7FeiFRpRx1U0mWdgibs9INxTmjZUav/vTh\n2ziHDhYTAgMBAAECggEAAQv92MnbCPLysIL9ti8MFkW4iIv/zdfwe4CLAkfbXwT2\nq79WDXGnXPBpgQOX56X69BWasGxMn+DO6zzxIbzHGQ4BWZ/Pb5NieaX6lokm5+NK\ntV598cuQDSzdlM98o0fgwqBMmpi5SSTUhhnHvwLeb/p4rcarV/ZcKUJEhVjEAWG5\ntg0qGBLtwEONzKocEGAgQN06BUNh4KLbIBkYDFYt/C7ObAUdu4hgnZlu2d5Sea8j\nk7DpVQ5+JJDnq1N+fJg9FTlJBiV88BOX9VU0k5O3VGJKcpHihH7Aw1tugV0fua+3\nv984W6DRsj3xxOERoXOjykClEVvcg8b7BiSOcpzG6QKBgQDwz10oot+yc4aNGUR4\nz3qxo03Np+5xWSHv3RcPTFyAeC54fQWFWHVDYwfSrMPOR1u2heFhDFPqG1jAMdDm\nVmAP3ea4NWmq2d68JrxJYkzvBMjjCRC1ldx2iCR6S1UiCvF6BSl3T5ECI8vbC/A5\ncbwJEEul05MgxxUpMRdSNqPu2wKBgQDTTWbUuR2J9wRNXy/TC8H2U6VYJzPyTCMg\nvaGMvq/G+W6XHizkGtGSD5GNFIkWczn9ksncogbzz7cdTvIEtIXf06eNztMP2amh\niCLt2/ohO0M9tJSPPFf2iFJ9uBVOjIvUATvZtgyxU6ZTmdjeef3JUTVadAekYqyh\nsdFuCcoPKQKBgQCfcZ2MJ3OYE5f2WtGUcEQb1DXSwqtFT7ABwtDe5z+kLG8Qhi8e\noHhcGvj2DEBFl8fo7XJSMLhrHJpB/3oC2RQXzWRTecIyRrmMuNUYfcbUx8U/ViRD\nJyvnK7ODade/h6Flmn9fKUapNQxoR9pSHrVTBwAflxwmqsqfEIsRe25F2wKBgD0I\nlHVJayDYuuNmZTf+o231R0MpP7XzDAp++9Tdl4RPtAPucWUJ4hLgcFhh4B8d9Vgr\nOCeEnaF7FBdhIEL/qdO3HSS24vwnEPpZik1ORvemWIvQR0EAWyAYzEsICw9/RTxd\nht4h2ZS25sorHBtW/VlTHagc78ApyFeEN0wjg7vRAoGBAJGCBx2c1ZaJqda0jazg\npT7P7vg/MNkuREOLVUYZcbKT3X7j5q/cCAZva888YGzuuYny6XwCvgAdoCB/XwdP\n6T0W/Q1NThxfD2vKhr4IoveJId2c03twnu8gaNpR+I1NPwbCiTW1yrx3+FTDC79H\nolRlkic2CXWKQC1F5tVWT6J4\n-----END PRIVATE KEY-----\n',
  }),
  databaseURL: 'https://quick-3909f.firebaseio.com',
}

const test = {
  credential: admin.credential.cert({
    projectId: 'quik-test-d955c',
    clientEmail:
      'firebase-adminsdk-jwzd8@quik-test-d955c.iam.gserviceaccount.com',
    privateKey:
      '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCvRxknRsT93DfV\nbjWegdNCNeYo2wxi0S+AjSdylX7i8tLZsn5Jg3jEj/eRrtyknAXs9Sbg995dP+i0\n+ilLBh/6p4XdVpFCss2eti14qvDX/GQTpz4y96K9ZYgiXjETZdvYs/7b0gqr2saM\nZpmJ7k4HNyBqQfYoGgggoGnss5FIAkyRYS7E8ZxTeSpCQxADXGp5mMjuDoipuKYE\nTKgELznh6dMRIILpDl4vwvuP/4u9NIrWiHkDN/6jhmVq88XPmu8tf/hFdK7Uecfc\n6Ob2pxkymCH+JFwzbZRK8bYaGEV0AZBlXNIFiaCL4/vylkCSLkfL+EUrfOC6pymI\nssoYYhr1AgMBAAECggEAKMHUWkL1Rx+YVxeRvcor/PMqEhl/e5HvZQnNoLIdB3pV\n57u+7Gq3ICPm+jgKQ/eo1BUcZYcVrKLSApVCGVkzAfbG5LU+wV7w+8UadTrwlpSw\nk7ZZuwHE1Jwhp/Y1nLBcivst2eExTI1qilbIQJ/KgpiBv9uXOPN2rNmIT/tgXrkQ\nwjhfsTPIlVrahy/L0ltAJU2zklwx/XafP5I+CtGgLIaFwfFQju0s8EP87gwiAYy2\naeF+uOzBqwgtYzO/51zTB2rlJwfKi2bKcYx6wU44Vk12EcSYKtIyc5warvNCGS35\neWM5911H/e1COyqkfl6D7E8ys325I/4d5CAmjvmesQKBgQDx1cy14MuTu5ZwZ6Aq\nbT8p5ZsartKu6hhobobasswaF8poSJnXb4T76jZnb4MupxR8T2Lx+9Q9yDvvJBEp\nMM6a+3aMg0u9qORw2n/pIAIvQZ3tA5P0BY6Y4x3zxWXpU4iz3RVTNuJ0EfX2TTmp\nf2gZHLfAiKJTdNhMuNFBadr/xQKBgQC5i01qQy7+viMtIFDxr/MSFAvG4Z08PbLQ\n/8B1R2oSEQ95fb25Mw/jrFq4jelh28ALU4EwHztKw94do/O5Rdlpp+1mRDma6wug\nY5IwhQYXkgrx4Gjwfm59LuU2VnYpK0Bgmh/i6vAbmki7huqGKkvh+eQUKDdEGRb4\nBZtYgmCxcQKBgQDBCqNAQ9L9eG5cB7wIYfBbp1aqdAblbSRSqHepN7RI19jQabO0\nDucemBUZeCBFK0Xk/RHEi/sd3ipJeIbiVH13pWc6PsxE9v5zP1d/ZfeYdU51FbgS\nwCTV0eXk4xu4pt+mg8I0DMmzUWr/UyHGNVeJRC1B2U+KQukuRRF0n+Ua6QKBgA+z\nlCeL6+wu1vc4puDtDNrYy25XJWE1r240VmsWUgmZW//h/i4v/gY8TakUiU14tTXA\nKUyTOAdJsAA+IZ/qI03nohVnbKCJh4BZLMPiXfOcrkRtwzOm317Emy0QAAvX1yjV\noiEn1I3hbopADpSv+5/x77Us+hBPNzxh7RV+YwRhAoGAOFd9JdrN2Pg875qU55Fx\nYeNKiaT0Pdi/4S+LzQ4WqYYunnxZt6K60XjkF0xSmBu1deXoPjQwph5lFfR6mfAo\nBXH/pVVNfwCjTds9SqqUcjLIowd6KVCXLPcUA0APycUe+PbicbgFPil87XssU00n\n8ti/IWa50CbBS2OVst8VjWM=\n-----END PRIVATE KEY-----\n',
  }),
  databaseURL: 'https://quik-test-d955c.firebaseio.com',
}

if (!admin.apps.length) {
  admin.initializeApp(prod)
}

export default admin
