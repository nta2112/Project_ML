# Báo cáo: Phân tích Phân cụm Dữ liệu Chứng khoán Sử dụng Thuật toán Expectation-Maximization (EM) với Gaussian Mixture Models (GMM)

---

## Slide 1: Giới thiệu và Mục tiêu Dự án

* **Tiêu đề:** Phân tích Đặc điểm Thị trường Chứng khoán bằng Kỹ thuật Học Máy Không Giám sát.
* **Nội dung:**
    * Thị trường chứng khoán biến động phức tạp, việc xác định các "trạng thái" hoặc "chế độ" thị trường tiềm ẩn có thể mang lại thông tin giá trị cho nhà đầu tư.
    * Dự án này sử dụng thuật toán Expectation-Maximization (EM) kết hợp với Gaussian Mixture Models (GMM) để phân cụm dữ liệu giao dịch chứng khoán.
    * **Mục tiêu:**
        * Khám phá các cụm (clusters) tiềm ẩn trong dữ liệu dựa trên giá đóng cửa điều chỉnh ('Adj Close') và khối lượng giao dịch ('Volume').
        * Hiểu rõ đặc điểm của từng cụm được phát hiện.
        * Trực quan hóa kết quả phân cụm.
* **Hình ảnh gợi ý:** Biểu đồ đường biểu diễn biến động giá cổ phiếu hoặc logo các sàn giao dịch.
    * `[Image of Biểu đồ biến động thị trường chứng khoán]`

---

## Slide 2: Mô tả Bộ Dữ liệu (data.csv)

* **Tiêu đề:** Tổng quan về Dữ liệu Đầu vào
* **Nội dung:**
    * **Nguồn dữ liệu:** Tệp `data.csv`.
    * **Số lượng bản ghi:** 10409 (trong ví dụ mã là 1000 mẫu, nhưng kết quả thực tế dựa trên dữ liệu đầy đủ của bạn).
    * **Số lượng thuộc tính:** 7 cột.
    * **Các cột dữ liệu chính:**
        * `Date`: Ngày giao dịch (kiểu object).
        * `Open`: Giá mở cửa (float64).
        * `High`: Giá cao nhất (float64).
        * `Low`: Giá thấp nhất (float64).
        * `Close`: Giá đóng cửa (float64).
        * `Adj Close`: Giá đóng cửa điều chỉnh (float64) - **Đặc trưng được chọn**.
        * `Volume`: Khối lượng giao dịch (int64, chuyển thành float trong code mẫu) - **Đặc trưng được chọn**.
    * **Đặc trưng sử dụng cho phân cụm:** 'Adj Close' và 'Volume'.
* **Hình ảnh gợi ý:** Bảng tóm tắt `df.info()` và `df.head()` từ Python.
    * `[Image of Bảng thông tin df.info() và df.head()]`

---

## Slide 3: Phương pháp Luận - Expectation-Maximization (EM)

* **Tiêu đề:** Giới thiệu Thuật toán Expectation-Maximization (EM)
* **Nội dung:**
    * EM là một thuật toán lặp để tìm ước lượng hợp lý cực đại (Maximum Likelihood Estimation - MLE) hoặc ước lượng hậu nghiệm cực đại (Maximum A Posteriori - MAP) cho các tham số trong mô hình thống kê có chứa các biến ẩn (latent variables).
    * **Quy trình lặp của EM gồm 2 bước:**
        1.  **Bước Expectation (E-step):** Tính toán giá trị kỳ vọng của log-likelihood của các biến ẩn, dựa trên các quan sát hiện tại và ước lượng tham số hiện tại. Trong GMM, bước này tính toán "trách nhiệm" (xác suất) mỗi điểm dữ liệu thuộc về mỗi cụm.
        2.  **Bước Maximization (M-step):** Cập nhật lại các tham số của mô hình bằng cách tối đa hóa giá trị kỳ vọng của log-likelihood (đã tính ở E-step). Trong GMM, bước này cập nhật trọng số, trung bình và ma trận hiệp phương sai của mỗi cụm.
    * Thuật toán lặp lại E-step và M-step cho đến khi các tham số hội tụ.
* **Hình ảnh gợi ý:** Sơ đồ khối minh họa vòng lặp E-M.
    * `[Image of Sơ đồ vòng lặp thuật toán EM]`

---

## Slide 4: Phương pháp Luận - Gaussian Mixture Models (GMM)

* **Tiêu đề:** Áp dụng GMM cho Phân cụm
* **Nội dung:**
    * GMM giả định rằng tất cả các điểm dữ liệu được tạo ra từ một hỗn hợp của một số hữu hạn các phân phối Gaussian với các tham số chưa biết.
    * Mỗi phân phối Gaussian tương ứng với một cụm.
    * **Ưu điểm của GMM:**
        * Phân cụm "mềm" (soft clustering): Mỗi điểm dữ liệu có một xác suất thuộc về mỗi cụm, thay vì gán cứng vào một cụm duy nhất.
        * Linh hoạt về hình dạng cụm: Có thể mô hình hóa các cụm có hình dạng elip (do sử dụng ma trận hiệp phương sai).
    * Trong dự án này, GMM được sử dụng để mô hình hóa các trạng thái thị trường khác nhau, với mỗi trạng thái là một thành phần Gaussian.
    * **Số lượng cụm (components) được chọn:** 3 (dựa trên kết quả bạn cung cấp).
* **Hình ảnh gợi ý:** Minh họa các phân phối Gaussian chồng chéo tạo thành GMM.
    * `[Image of Minh họa các cụm Gaussian chồng chéo]`

---

## Slide 5: Tiền xử lý Dữ liệu

* **Tiêu đề:** Các Bước Chuẩn bị Dữ liệu
* **Nội dung:**
    1.  **Tải dữ liệu:** Đọc tệp `data.csv` vào DataFrame của Pandas.
    2.  **Lựa chọn đặc trưng:** Chọn các cột 'Adj Close' và 'Volume' làm đầu vào cho mô hình GMM.
        * `features = ['Adj Close', 'Volume']`
    3.  **Xử lý giá trị thiếu (Missing Values):** Kiểm tra và điền giá trị thiếu (nếu có) bằng giá trị trung bình của cột tương ứng.
        * `X = X.fillna(X.mean())`
    4.  **Chuẩn hóa dữ liệu (Data Scaling):**
        * Sử dụng `StandardScaler` từ `sklearn.preprocessing`.
        * Mục đích: Đưa các đặc trưng về cùng một thang đo (trung bình 0, phương sai 1). Điều này quan trọng vì GMM nhạy cảm với tỷ lệ của các đặc trưng.
        * `scaler = StandardScaler()`
        * `X_scaled = scaler.fit_transform(X)`
* **Hình ảnh gợi ý:** Sơ đồ quy trình tiền xử lý.

---

## Slide 6: Huấn luyện Mô hình GMM & Kết quả Bước Expectation (Cuối cùng)

* **Tiêu đề:** Áp dụng GMM và Phân tích Bước Expectation
* **Nội dung:**
    * **Huấn luyện mô hình:**
        * Khởi tạo `GaussianMixture` với `n_components=3`, `random_state=42`, `covariance_type='full'`.
        * Huấn luyện mô hình trên dữ liệu đã chuẩn hóa: `gmm.fit(X_scaled)`.
    * **Kết quả Bước Expectation (E-step) - Sau khi hội tụ:**
        * E-step tính toán xác suất mỗi điểm dữ liệu thuộc về từng cụm (component). Đây là các "trách nhiệm" (responsibilities).
        * Trong `sklearn`, sau khi `fit()`, chúng ta có thể lấy các xác suất này bằng `gmm.predict_proba(X_scaled)`.
        * **Ví dụ (5 điểm dữ liệu đầu tiên - minh họa cấu trúc):**
            ```
            P(Cluster 0)  P(Cluster 1)  P(Cluster 2)
            0        0.002         0.997         0.001
            1        0.985         0.012         0.003
            2        0.000         0.000         1.000
            ...
            ```
        * Giá trị `responsibilities[i, k]` là xác suất điểm dữ liệu `i` thuộc về cụm `k`.
* **Hình ảnh gợi ý:** Bảng ví dụ về ma trận "trách nhiệm" từ kết quả thực tế.

---

## Slide 7: Kết quả Bước Maximization (Cuối cùng) - CẬP NHẬT

* **Tiêu đề:** Phân tích Bước Maximization - Tham số Mô hình
* **Nội dung:**
    * **Bước Maximization (M-step) - Sau khi hội tụ:**
        * M-step cập nhật các tham số của mô hình (trọng số, trung bình, hiệp phương sai của mỗi cụm) dựa trên các trách nhiệm đã tính ở E-step, nhằm tối đa hóa likelihood của dữ liệu.
        * Các tham số này được lưu trong mô hình `gmm` sau khi huấn luyện:
            * **Trọng số cụm (`gmm.weights_`):** Tỷ lệ của mỗi cụm trong hỗn hợp. (Ví dụ: Cụm 0: 0.33, Cụm 1: 0.35, Cụm 2: 0.32 - *Lưu ý: Giá trị này không có trong output bạn cung cấp, cần lấy từ `gmm.weights_` nếu muốn chính xác*).
            * **Trung bình cụm (`gmm.means_`) (đã chuẩn hóa):**
                * Cụm 0 ('Adj Close' chuẩn hóa): **-0.43831502102671976** (Các thành phần khác của vector trung bình chuẩn hóa cho 'Volume' và các cụm khác cũng cần được liệt kê nếu có).
                * *(Cần bổ sung giá trị trung bình chuẩn hóa cho 'Volume' của Cụm 0, và cả 'Adj Close' và 'Volume' chuẩn hóa cho Cụm 1, Cụm 2 từ `gmm.means_`)*
            * **Hiệp phương sai cụm (`gmm.covariances_`) (đã chuẩn hóa):** Ma trận mô tả hình dạng và hướng của mỗi cụm. *(Cần hiển thị ma trận hoặc mô tả chính từ `gmm.covariances_`)*
    * **Diễn giải giá trị gốc (Means - mu_k):**
        * **Cụm 0:** Adj Close = **0.24**, Volume = **209,199,214.40**
        * **Cụm 1:** Adj Close = **7.29**, Volume = **690,681,948.29**
        * **Cụm 2:** Adj Close = **60.11**, Volume = **136,971,319.30**
* **Hình ảnh gợi ý:** Bảng tóm tắt các tham số `weights_`, `means_` (cả chuẩn hóa và gốc), `covariances_`.

---

## Slide 8: Trực quan hóa Kết quả - Biểu đồ Phân cụm

* **Tiêu đề:** Trực quan hóa các Cụm Dữ liệu
* **Nội dung:**
    * Biểu đồ scatter plot của hai đặc trưng ('Adj Close' và 'Volume' - đã chuẩn hóa) với các điểm được tô màu theo cụm được gán bởi GMM.
    * Các hình ellipse được vẽ chồng lên biểu đồ, đại diện cho đường đồng mức (contour) của các phân phối Gaussian cho mỗi cụm.
        * Ellipse thể hiện trung tâm (mean) và hình dạng/độ phân tán (covariance) của mỗi cụm.
    * **Mục đích:** Giúp hình dung vị trí, kích thước và hình dạng tương đối của các cụm trong không gian đặc trưng.
* **Hình ảnh:** Biểu đồ scatter plot với các cụm và ellipse GMM từ output của script.
    * `[Image of Biểu đồ phân cụm GMM với Adj Close và Volume từ kết quả thực tế]`

---

## Slide 9: Trực quan hóa Kết quả - Phân phối Đặc trưng theo Cụm

* **Tiêu đề:** Phân tích Đặc điểm của Từng Cụm
* **Nội dung:**
    * **Biểu đồ Histogram/KDE:**
        * Vẽ biểu đồ phân phối (histogram có đường ước lượng mật độ Kernel - KDE) cho từng đặc trưng ('Adj Close', 'Volume' - đã chuẩn hóa), được tách riêng cho mỗi cụm.
        * Giúp so sánh sự khác biệt trong phân phối giá trị của các đặc trưng giữa các cụm.
    * **Biểu đồ Pairplot:**
        * Hiển thị mối quan hệ giữa tất cả các cặp đặc trưng, được tô màu theo cụm (sử dụng dữ liệu gốc để dễ diễn giải).
        * Cung cấp cái nhìn tổng quan về cách các cụm phân tách trong không gian đa chiều.
* **Hình ảnh:** Các biểu đồ histogram và pairplot từ output của script.
    * `[Image of Biểu đồ phân phối Adj Close theo cụm từ kết quả thực tế]`
    * `[Image of Biểu đồ phân phối Volume theo cụm từ kết quả thực tế]`
    * `[Image of Biểu đồ Pairplot các đặc trưng theo cụm từ kết quả thực tế]`

---

## Slide 10: Kết luận và Hướng Phát triển - CẬP NHẬT

* **Tiêu đề:** Tóm tắt Kết quả và Định hướng Tương lai
* **Nội dung:**
    * **Tóm tắt kết quả:**
        * Thuật toán EM-GMM đã được áp dụng thành công để phân cụm dữ liệu giao dịch chứng khoán thành 3 cụm dựa trên 'Adj Close' và 'Volume'.
        * Đã xác định được các tham số (trung bình, hiệp phương sai) cho từng cụm, mô tả đặc điểm của chúng. (Trọng số cụm cần được kiểm tra từ `gmm.weights_`).
        * Các biểu đồ trực quan hóa cho thấy sự phân tách tương đối của các cụm.
    * **Thông tin hội tụ mô hình:**
        * Giá trị Lower Bound của Log-Likelihood (ELBO) khi hội tụ: **0.3201**
        * Số vòng lặp EM đã thực hiện: **20**
    * **Ý nghĩa (dựa trên giá trị gốc của trung bình cụm):**
        * **Cụm 0:** Có thể đại diện cho trạng thái thị trường với giá trị giao dịch ('Adj Close') rất thấp (0.24) và khối lượng giao dịch trung bình (khoảng 209M).
        * **Cụm 1:** Có thể đại diện cho trạng thái thị trường với giá trị giao dịch thấp (7.29) nhưng khối lượng giao dịch rất cao (khoảng 690M) - có thể là những phiên giao dịch sôi động ở vùng giá thấp hoặc có tin tức đặc biệt.
        * **Cụm 2:** Có thể đại diện cho trạng thái thị trường với giá trị giao dịch cao hơn đáng kể (60.11) và khối lượng giao dịch thấp nhất trong ba cụm (khoảng 137M) - có thể là giai đoạn tăng trưởng ổn định hoặc ít biến động ở vùng giá cao.
    * **Hạn chế và Hướng phát triển:**
        * Lựa chọn số lượng cụm (n\_components) có thể được cải thiện bằng các phương pháp như AIC, BIC.
        * Thử nghiệm với các đặc trưng khác (ví dụ: % thay đổi giá, log(Volume), các chỉ báo kỹ thuật).
        * Phân tích sâu hơn về ý nghĩa kinh tế và tính ổn định của từng cụm theo thời gian.
        * Sử dụng mô hình Hidden Markov Models (HMM) để nắm bắt sự chuyển đổi giữa các trạng thái thị trường theo thời gian.
* **Hình ảnh gợi ý:** Một biểu đồ tổng hợp hoặc một hình ảnh mang tính biểu tượng về phân tích dữ liệu.

---

**Lưu ý quan trọng cho Slide 7:**
* Bạn cần lấy thêm các giá trị `gmm.weights_` (trọng số cụm) và các thành phần còn lại của `gmm.means_` (phần 'Volume' chuẩn hóa cho Cụm 0, và cả 'Adj Close' và 'Volume' chuẩn hóa cho Cụm 1, Cụm 2) và `gmm.covariances_` từ script Python để điền đầy đủ thông tin cho slide này. Các giá trị này rất quan trọng để mô tả đầy đủ mô hình GMM.
