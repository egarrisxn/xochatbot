import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export default function TermsOfServicePage() {
  return (
    <section className="grid min-h-[100dvh] w-full grid-rows-[auto_1fr_auto]">
      <Navbar hrefLink="/dashboard" linkName="Dashboard" />
      <div className="flex container mx-auto md:items-center max-w-2xl">
        <div className="grid grid-rows-1 w-full">
          <div></div>
          <div className="px-4 lg:px-0">
            <h1 className="mb-4 lg:mb-2 text-2xl lg:text-3xl text-primary font-bold">
              Terms of Service
            </h1>
            <p className="text-sm lg:text-base lg:leading-normal leading-tight text-justify">
              THE SOFTWARE IS PROVIDED AS IS, WITHOUT WARRANTY OF ANY KIND,
              EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
              MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
              NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
              HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
              WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
              OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
              DEALINGS IN THE SOFTWARE.
            </p>
          </div>
          <div></div>
        </div>
      </div>
      <Footer />
    </section>
  );
}
