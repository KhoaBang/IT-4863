const data = [
    {
        "tenchude": "An ninh quốc gia",
        "tendemuc": "Biển Việt Nam",
        "tenchuong": "Chương I NHỮNG QUY ĐỊNH CHUNG",
        "tendieu": "Điều 1.5.LQ.1. Phạm vi điều chỉnh",
        "noidung": "Luật này quy định về đường cơ sở, nội thủy, lãnh hải, vùng tiếp giáp lãnh hải, vùng đặc quyền kinh tế, thềm lục địa, các đảo, quần đảo Hoàng Sa, quần đảo Trường Sa và quần đảo khác thuộc chủ quyền, quyền chủ quyền, quyền tài phán quốc gia của Việt Nam; hoạt động trong vùng biển Việt Nam; phát triển kinh tế biển; quản lý và bảo vệ biển, đảo. \n"
    },
    {
        "tenchude": "An ninh quốc gia",
        "tendemuc": "Biển Việt Nam",
        "tenchuong": "Chương I NHỮNG QUY ĐỊNH CHUNG",
        "tendieu": "Điều 1.5.NĐ.1.1. Phạm vi điều chỉnh",
        "noidung": "1. Nghị định này quy định việc giao khu vực biển nhất định trên các vùng biển Việt Nam cho tổ chức, cá nhân để khai thác, sử dụng tài nguyên biển theo giấy chứng nhận đầu tư, giấy phép hoặc quyết định cho phép khai thác, sử dụng tài nguyên biển của cơ quan quản lý nhà nước có thẩm quyền; trách nhiệm của các cơ quan nhà nước, tổ chức, cá nhân có liên quan đến việc giao khu vực biển.\n2. Việc giao khu vực biển để thăm dò, khai thác dầu khí thực hiện theo quy định của pháp luật về dầu khí; việc khai thác thủy sản, cho thuê mặt nước biển để nuôi trồng thủy sản thực hiện theo quy định của pháp luật về thủy sản; việc giao khu vực biển để sử dụng vào mục đích quốc phòng, an ninh thực hiện theo quy định riêng của Chính phủ. \n"
    },
    {
        "tenchude": "An ninh quốc gia",
        "tendemuc": "Biển Việt Nam",
        "tenchuong": "Chương I NHỮNG QUY ĐỊNH CHUNG",
        "tendieu": "Điều 1.5.NĐ.1.2. Đối tượng áp dụng",
        "noidung": "Nghị định này áp dụng đối với các cơ quan, tổ chức, cá nhân liên quan đến việc giao khu vực biển, khai thác, sử dụng tài nguyên biển. \n"
    },
    {
        "tenchude": "An ninh quốc gia",
        "tendemuc": "Biển Việt Nam",
        "tenchuong": "Chương I NHỮNG QUY ĐỊNH CHUNG",
        "tendieu": "Điều 1.5.NĐ.2.1. Phạm vi điều chỉnh",
        "noidung": "Nghị định này quy định về việc công bố tuyến hàng hải và phân luồng giao thông trong lãnh hải Việt Nam phục vụ cho việc tàu thuyền đi qua không gây hại nhằm bảo đảm an toàn hàng hải, an ninh hàng hải và phòng ngừa ô nhiễm môi trường biển. \n"
    },
    {
        "tenchude": "An ninh quốc gia",
        "tendemuc": "Biển Việt Nam",
        "tenchuong": "Chương I NHỮNG QUY ĐỊNH CHUNG",
        "tendieu": "Điều 1.5.NĐ.2.2. Đối tượng áp dụng",
        "noidung": "Nghị định này áp dụng đối với cơ quan, tổ chức, cá nhân liên quan đến công bố tuyến hàng hải, phân luồng giao thông và tàu thuyền tham gia giao thông trong lãnh hải Việt Nam. \n"
    },
    {
        "tenchude": "An ninh quốc gia",
        "tendemuc": "Biển Việt Nam",
        "tenchuong": "Chương I NHỮNG QUY ĐỊNH CHUNG",
        "tendieu": "Điều 1.5.NĐ.3.1. Phạm vi điều chỉnh, đối tượng áp dụng",
        "noidung": "1. Phạm vi điều chỉnh\na) Nghị định này quy định việc giao các khu vực biển nhất định từ đường mép nước biển thấp nhất trung bình trong nhiều năm ra đến hết các vùng biển Việt Nam cho tổ chức, cá nhân để khai thác, sử dụng tài nguyên biển theo văn bản cho phép khai thác, sử dụng tài nguyên biển của cơ quan nhà nước có thẩm quyền cấp cho tổ;chức, cá nhân theo quy định của pháp luật;\nb) Việc sử dụng khu vực biển vào mục đích quốc phòng, an ninh không thuộc phạm vi điều chỉnh của Nghị định này.\n2. Đối tượng áp dụng\nNghị định này áp dụng đối với các cơ quan quản lý nhà;nước, tổ chức, cá nhân liên quan đến việc giao khu vực biển để;khai thác, sử dụng tài nguyên biển. \n"
    },
    {
        "tenchude": "An ninh quốc gia",
        "tendemuc": "Biển Việt Nam",
        "tenchuong": "Chương I NHỮNG QUY ĐỊNH CHUNG",
        "tendieu": "Điều 1.5.TL.1.1. Phạm vi điều chỉnh",
        "noidung": "1. Thông tư này quy định phương pháp tính, phương thức thu, chế độ quản lý và sử dụng tiền sử dụng khu vực biển khi tổ chức, cá nhân được cơ quan quản lý nhà nước hoặc cấp có thẩm quyền giao khu vực biển để khai thác, sử dụng tài nguyên biển theo quy định tại Nghị định số 51\/2014\/NĐ-CP ngày 21 tháng 5 năm 2014 của Chính phủ quy định việc giao các khu vực biển nhất định cho tổ chức, cá nhân khai thác, sử dụng tài nguyên biển (sau đây gọi tắt là Nghị định số 51\/2014\/NĐ-CP).\n2. Thông tư này không áp dụng đối với các trường hợp quy định tại Khoản 2 Điều 1 Nghị định số 51\/2014\/NĐ-CP, gồm:\na) Giao khu vực biển để thăm dò, khai thác dầu khí;\nb) Giao khu vực biển để khai thác thủy sản, cho thuê mặt nước để nuôi trồng thủy sản;\nc) Giao khu vực biển để sử dụng vào mục đích quốc phòng, an ninh. \n"
    },
    {
        "tenchude": "An ninh quốc gia",
        "tendemuc": "Biển Việt Nam",
        "tenchuong": "Chương I NHỮNG QUY ĐỊNH CHUNG",
        "tendieu": "Điều 1.5.TL.1.2. Đối tượng áp dụng",
        "noidung": "1. Tổ chức, cá nhân được giao khu vực biển để khai thác, sử dụng tài nguyên biển theo quy định tại Nghị định số 51\/2014\/NĐ-CP.\n2. Cơ quan quản lý nhà nước, cấp có thẩm quyền giao khu vực biển.\n3. Các cơ quan, tổ chức, cá nhân khác có liên quan. \n"
    },
    {
        "tenchude": "An ninh quốc gia",
        "tendemuc": "Biển Việt Nam",
        "tenchuong": "Chương I NHỮNG QUY ĐỊNH CHUNG",
        "tendieu": "Điều 1.5.TT.1.1. Phạm vi điều chỉnh, đối tượng áp dụng",
        "noidung": "1. Phạm vi điều chỉnh\nThông tư này quy định mức thu tiền sử dụng khu vực biển cụ thể thuộc thẩm quyền giao khu vực biển của Thủ tướng Chính phủ và Bộ Tài nguyên và Môi trường.\n2. Đối tượng áp dụng\nThông tư này áp dụng đối với các cơ quan, tổ chức, cá nhân liên quan đến các hoạt động sử dụng khu vực biển phải nộp tiền sử dụng biển thuộc thẩm quyền giao khu vực biển của Thủ tướng Chính phủ và Bộ Tài nguyên và Môi trường. \n"
    },
    {
        "tenchude": "An ninh quốc gia",
        "tendemuc": "Biển Việt Nam",
        "tenchuong": "Chương I NHỮNG QUY ĐỊNH CHUNG",
        "tendieu": "Điều 1.5.LQ.2. Áp dụng pháp luật",
        "noidung": "1. Trường hợp có sự khác nhau giữa quy định của Luật này với quy định của luật khác về chủ quyền, chế độ pháp lý của vùng biển Việt Nam thì áp dụng quy định của Luật này.\n2. Trường hợp quy định của Luật này khác với quy định của điều ước quốc tế mà nước Cộng hòa xã hội chủ nghĩa Việt Nam là thành viên thì áp dụng quy định của điều ước quốc tế đó. \n"
    },
    {
        "tenchude": "An ninh quốc gia",
        "tendemuc": "Biển Việt Nam",
        "tenchuong": "Chương I NHỮNG QUY ĐỊNH CHUNG",
        "tendieu": "Điều 1.5.LQ.3. Giải thích từ ngữ",
        "noidung": "Trong Luật này, các từ ngữ dưới đây được hiểu như sau:\n1. Vùng biển Việt Nam bao gồm nội thủy, lãnh hải, vùng tiếp giáp lãnh hải, vùng đặc quyền kinh tế và thềm lục địa thuộc chủ quyền, quyền chủ quyền và quyền tài phán quốc gia của Việt Nam, được xác định theo pháp luật Việt Nam, điều ước quốc tế về biên giới lãnh thổ mà nước Cộng hòa xã hội chủ nghĩa Việt Nam là thành viên và phù hợp với Công ước của Liên hợp quốc về Luật biển năm 1982.\n2. Vùng biển quốc tế là tất cả các vùng biển nằm ngoài vùng đặc quyền kinh tế của Việt Nam và các quốc gia khác, nhưng không bao gồm đáy biển và lòng đất dưới đáy biển.\n3. Tàu thuyền là phương tiện hoạt động trên mặt nước hoặc dưới mặt nước bao gồm tàu, thuyền và các phương tiện khác có động cơ hoặc không có động cơ.\n4. Tàu quân sự là tàu thuyền thuộc lực lượng vũ trang của một quốc gia và mang dấu hiệu bên ngoài thể hiện rõ quốc tịch của quốc gia đó, do một sĩ quan hải quân phục vụ quốc gia đó chỉ huy, người chỉ huy này có tên trong danh sách sĩ quan hay trong một tài liệu tương đương; được điều hành bởi thuỷ thủ đoàn hoạt động theo các điều lệnh kỷ luật quân sự.\n5. Tàu thuyền công vụ là tàu thuyền chuyên dùng để thực hiện các công vụ của Nhà nước không vì mục đích thương mại.\n6. Tài nguyên bao gồm tài nguyên sinh vật và tài nguyên phi sinh vật thuộc khối nước, đáy và lòng đất dưới đáy biển.\n7. Đường đẳng sâu là đường nối liền các điểm có cùng độ sâu ở biển. \n"
    }];

    export {data}; 